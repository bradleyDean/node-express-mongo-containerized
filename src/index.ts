import app from './app';

// const port = process.env.PORT || 3000; 
const port = 3000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
