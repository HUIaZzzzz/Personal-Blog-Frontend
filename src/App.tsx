import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootLayout from '@/components/layouts/RootLayout';
import Home from './pages/Home';
import Blog from './pages/Blog';
import BlogPost, { blogPostLoader } from './pages/BlogPost';
import Projects from './pages/Projects';
import About from './pages/About';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'blog', element: <Blog /> },
      {
        path: 'blog/:slug',
        element: <BlogPost />,
        loader: blogPostLoader,
      },
      { path: 'projects', element: <Projects /> },
      { path: 'about', element: <About /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
