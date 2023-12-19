import React from 'react';
import { Typography, Button, Container, Grid, Card, CardContent, CardMedia } from '@mui/material';

const Landingpage = () => {
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
                                    <Button variant="contained" color="primary" size="large">
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
                {[1, 2, 3, 4, 5, 6].map((index) => (
                    <Grid item key={index} xs={12} sm={4}>
                        <Card elevation={6}>
                            <CardMedia
                                component="img"
                                height="200"
                                image={`https://source.unsplash.com/random?book&${index}`} // Random book cover image
                                alt={`Book ${index}`}
                            />
                            <CardContent>
                                <Typography variant="h6" align="center" gutterBottom>
                                    Book Title {index}
                                </Typography>
                                <Typography variant="body2" align="center">
                                    Author: Author Name
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
                {[7, 8, 9, 10].map((index) => (
                    <Grid item key={index} xs={12} sm={4}>
                        <Card elevation={6}>
                            <CardMedia
                                component="img"
                                height="200"
                                image={`https://source.unsplash.com/random?bookcover&${index}`} // Random book cover image
                                alt={`Book ${index}`}
                            />
                            <CardContent>
                                <Typography variant="h6" align="center" gutterBottom>
                                    New Book Title {index}
                                </Typography>
                                <Typography variant="body2" align="center">
                                    Author: New Author Name
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
                {[
                    { name: 'Mystery', image: 'https://source.unsplash.com/random?mystery' },
                    { name: 'Romance', image: 'https://source.unsplash.com/random?romance' },
                    { name: 'Science Fiction', image: 'https://source.unsplash.com/random?scifi' },
                    { name: 'Fantasy', image: 'https://source.unsplash.com/random?fantasy' },
                    { name: 'Thriller', image: 'https://source.unsplash.com/random?thriller' },
                ].map((genre, index) => (
                    <Grid item key={index} xs={12} sm={4}>
                        <Card elevation={6}>
                            <CardMedia component="img" height="200" image={genre.image} alt={genre.name} />
                            <CardContent>
                                <Typography variant="h6" align="center" gutterBottom>
                                    {genre.name}
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
                {[
                    { name: 'Author 1', image: 'https://source.unsplash.com/random?man' },
                    { name: 'Author 2', image: 'https://source.unsplash.com/random?women' },
                    { name: 'Author 3', image: 'https://source.unsplash.com/random?writer' },
                    { name: 'Author 4', image: 'https://source.unsplash.com/random?port' },
                    { name: 'Author 5', image: 'https://source.unsplash.com/random?author' }
                ].map((author, index) => (
                    <Grid item key={index} xs={12} sm={4}>
                        <Card elevation={6}>
                            <CardMedia component="img" height="200" image={author.image} alt={author.name} />
                            <CardContent>
                                <Typography variant="h6" align="center" gutterBottom>
                                    {author.name}
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
                {[
                    { name: 'Harry Potter', image: 'https://source.unsplash.com/random?harrypotter', description: 'Magical adventures at Hogwarts' },
                    { name: 'Game of Thrones', image: 'https://source.unsplash.com/random?gameofthrones', description: 'Epic fantasy series with political intrigue' },
                    { name: 'The Hunger Games', image: 'https://source.unsplash.com/random?hungergames', description: 'Dystopian survival series' },
                    { name: 'Percy Jackson', image: 'https://source.unsplash.com/random?percyjackson', description: 'Modern-day demigod adventures' },
                ].map((series, index) => (
                    <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
                        <Card elevation={6}>
                            <CardMedia component="img" height="200" image={series.image} alt={series.name} />
                            <CardContent>
                                <Typography variant="h6" align="center" gutterBottom>
                                    {series.name}
                                </Typography>
                                <Typography variant="body2" align="center" color="textSecondary">
                                    {series.description}
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
                                    <Button variant="contained" color="primary" size="large">
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
