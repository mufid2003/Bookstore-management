import React, { useEffect, useState } from 'react';
import { Typography, Button, Container, Grid, Card, CardContent, CardMedia } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Landingpage = () => {
    const [featuredBooks, setFeaturedBooks] = useState([]);
    const [latestReleases, setLatestReleases] = useState([]);
    const [topGenres, setTopGenres] = useState([]);
    const [popularBookSeries, setPopularBookSeries] = useState([]);
    const dummyTopAuthors = [
        { id: 1, volumeInfo: { title: 'J.K. Rowling', imageLinks: { thumbnail: 'https://source.unsplash.com/featured/ALx0hYEZT8o' } } },
        { id: 2, volumeInfo: { title: 'Stephen King', imageLinks: { thumbnail: 'https://source.unsplash.com/featured/1_KJrA5JrR9HhI2B2-unsplash' } } },
        { id: 3, volumeInfo: { title: 'Agatha Christie', imageLinks: { thumbnail: 'https://source.unsplash.com/featured/K6z_uX4nZVw' } } },
        { id: 4, volumeInfo: { title: 'George R.R. Martin', imageLinks: { thumbnail: 'https://source.unsplash.com/featured/gtVh-0tXyNc' } } },
        { id: 5, volumeInfo: { title: 'J.R.R. Tolkien', imageLinks: { thumbnail: 'https://source.unsplash.com/featured/Yia1H9c4v6Y' } } },
    ];

    const navigate = useNavigate();
    useEffect(() => {
        const fetchBooks = async (query, setStateFunction) => {
            try {
                const response = await fetch(
                    `https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=6`
                );

                if (!response.ok) {
                    throw new Error('Failed to fetch book data');
                }

                const data = await response.json();
                setStateFunction(data.items);
            } catch (error) {
                console.error('Error fetching book data:', error);
            }
        };

        // Fetch featured books
        fetchBooks('featuredbooks', setFeaturedBooks);

        // Fetch latest releases
        fetchBooks('subject:new', setLatestReleases);

        // Fetch top genres (using a generic query)
        fetchBooks('topgenre', setTopGenres);

        // Fetch popular book series (using a series title query)
        fetchBooks('popularbookseries', setPopularBookSeries);
    }, []);

    const truncateDescription = (description, maxLength = 200) => {
        if (!description) return '';

        // Truncate the description to the specified length
        const truncated = description.length > maxLength ? `${description.slice(0, maxLength)}...` : description;
        return truncated;
    };

    const handleExplore = () => {
        let userId = localStorage.getItem('user_id');
        let role = localStorage.getItem('role');
        if(userId){
            if(role === 'customer'){
                navigate('/customer');
            }else if(role === 'employee'){
                navigate('/employee')
            }else if( role === 'admin'){
                navigate('/admin')
            }else{
                navigate('/login');
            }
        }else{
            navigate('/login');
        }
    }

    return (
        <Container>
            {/* Hero Section */}
            <Grid
                container
                style={{ minHeight: '80vh', alignItems: 'center', justifyContent: 'center', marginTop: '20px' }}
            >
                <Grid item xs={12} sm={12} md={12} lg={12} style={{ maxWidth: '120%' }}>
                    <Card elevation={6}>
                        <CardMedia
                            component="img"
                            height="500"  // Adjust the height as needed
                            image="https://source.unsplash.com/random?bookstore" // Random book cover image
                            alt="Bookstore"
                        />
                        <CardContent>
                            <Typography
                                variant="h2"
                                align="center"
                                gutterBottom
                                style={{ color: '#4CAF50', marginTop: '30px' }}
                            >
                                Welcome to Our Bookstore
                            </Typography>
                            <Typography
                                variant="h5"
                                align="center"
                                paragraph
                                style={{ color: '#555', marginBottom: '30px' }}
                            >
                                Explore a world of books, discover your next favorite read!
                            </Typography>
                            <Grid container spacing={2} justifyContent="center">
                                <Grid item>
                                    <Button variant="contained" color="primary" size="large" onClick={handleExplore}> 
                                        Browse Books
                                    </Button>

                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>



            {/* Featured Books Section */}
            <Grid container spacing={4} style={{ marginTop: '50px', marginBottom: '50px' }}>
                <Grid item xs={12}>
                    <Typography variant="h4" align="center" gutterBottom style={{ color: '#4CAF50' }}>
                        Featured Books
                    </Typography>
                </Grid>
                {featuredBooks.map((book) => (
                    <Grid item key={book.id} xs={12} sm={4}>
                        <Card elevation={6}>
                            <CardMedia
                                component="img"
                                height="300"
                                width='100%'
                                image={book.volumeInfo.imageLinks.thumbnail ? book.volumeInfo.imageLinks.thumbnail : `https://source.unsplash.com/random?book&${book.title}`} // Random book cover image
                                alt={`Book ${book.volumeInfo.title}`}
                            />
                            <CardContent>
                                <Typography variant="h6" align="center" gutterBottom>
                                    {book.volumeInfo.title || 'Unknown Title'}
                                </Typography>
                                <Typography variant="body2" align="center">
                                    Author: {book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'Unknown Author'}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>

                ))}
            </Grid>

            {/* Latest Releases Section */}
            <Grid container spacing={4} style={{ marginTop: '50px' }}>
                <Grid item xs={12}>
                    <Typography variant="h4" align="center" gutterBottom style={{ color: '#4CAF50' }}>
                        Latest Releases
                    </Typography>
                </Grid>
                {latestReleases.map((book) => (
                    <Grid item key={book.id} xs={12} sm={4}>
                        <Card elevation={6}>
                            <CardMedia
                                component="img"
                                height="300"
                                image={book.volumeInfo.imageLinks?.thumbnail || `https://source.unsplash.com/random?book&${book.title}`}
                                alt={`Book ${book.volumeInfo.title}`}
                            />
                            <CardContent>
                                <Typography variant="h6" align="center" gutterBottom>
                                    {book.volumeInfo.title || 'Unknown Title'}
                                </Typography>
                                <Typography variant="body2" align="center">
                                    Author: {book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'Unknown Author'}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {/* Top Genres Section */}
            <Grid container spacing={4} style={{ marginTop: '50px' }}>
                <Grid item xs={12}>
                    <Typography variant="h4" align="center" gutterBottom style={{ color: '#4CAF50' }}>
                        Top Genres
                    </Typography>
                </Grid>
                {topGenres.map((genre) => (
                    <Grid item key={genre.id} xs={12} sm={4}>
                        <Card elevation={6}>
                            <CardMedia
                                component="img"
                                height="200"
                                image={genre.volumeInfo?.imageLinks?.thumbnail || 'https://source.unsplash.com/random?genre'}
                                alt={genre.volumeInfo?.title || 'Unknown Genre'}
                            />
                            <CardContent>
                                <Typography variant="h6" align="center" gutterBottom>
                                    {genre.volumeInfo?.categories || 'Unknown Genre'}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {/* Popular Authors Section */}
            <Grid container spacing={4} style={{ marginTop: '50px' }}>
                <Grid item xs={12}>
                    <Typography variant="h4" align="center" gutterBottom style={{ color: '#4CAF50' }}>
                        Popular Authors
                    </Typography>
                </Grid>
                {dummyTopAuthors.map((author) => (
                    <Grid item key={author.id} xs={12} sm={4}>
                        <Card elevation={6}>
                            <CardMedia
                                component="img"
                                height="200"
                                image={author.volumeInfo?.imageLinks?.thumbnail || 'https://source.unsplash.com/random?author'}
                                alt={author.volumeInfo?.title || 'Unknown Author'}
                            />
                            <CardContent>
                                <Typography variant="h6" align="center" gutterBottom>
                                    {author.volumeInfo?.title || 'Unknown Author'}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {/* Popular Book Series Section */}
            <Grid container spacing={4} style={{ marginTop: '50px' }}>
                <Grid item xs={12}>
                    <Typography variant="h4" align="center" gutterBottom style={{ color: '#4CAF50' }}>
                        Popular Book Series
                    </Typography>
                </Grid>
                {popularBookSeries.map((series) => (
                    <Grid item key={series.id} xs={12} sm={6} md={4} lg={3}>
                        <Card elevation={6}>
                            <CardMedia
                                component="img"
                                height="300"
                                image={series.volumeInfo?.imageLinks?.thumbnail || 'https://source.unsplash.com/random?bookseries'}
                                alt={series.volumeInfo?.title || 'Unknown Series'}
                            />
                            <CardContent>
                                <Typography variant="h6" align="center" gutterBottom>
                                    {series.volumeInfo?.title || 'Unknown Series'}
                                </Typography>
                                <Typography variant="body2" align="center" color="textSecondary">
                                    {truncateDescription(series.volumeInfo?.description) || 'No description available'}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>



            {/* Call-to-Action */}
            <Grid container spacing={4} alignItems="center" justifyContent="center" style={{ marginTop: '50px' }}>
                <Grid item xs={12} sm={16} md={14} lg={12}>
                    <Card elevation={6}>
                        <CardContent>
                            <Typography variant="h4" align="center" gutterBottom style={{ color: '#4CAF50' }}>
                                Ready to Dive into a World of Books?
                            </Typography>
                            <Typography variant="body1" align="center" paragraph style={{ color: '#555', marginBottom: '30px' }}>
                                Start your reading journey now! Explore a vast collection of books covering various genres.
                            </Typography>
                            <Grid container spacing={2} justifyContent="center">
                                <Grid item>
                                    <Button variant="contained" color="primary" size="large" onClick={handleExplore}>
                                        Explore Books
                                    </Button>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

        </Container>
    );
};

export default Landingpage;
