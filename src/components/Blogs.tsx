import React, { useState } from "react";
import backgroundImage from './../assets/website_background.jpg';
import "./Blogs.css"

interface Blog {
  id: number;
  author: string;
  title: string;
  content: string;
  type: "me" | "others";
}

const BLOGS_DATA: Blog[] = [
  {
    id: 1,
    author: "John Doe",
    title: "My First Blog",
    content: "Lorem ipsum dolor sit amet...",
    type: "me",
  },
  {
    id: 2,
    author: "Jane Doe",
    title: "My Second Blog",
    content: "Lorem ipsum dolor sit amet...",
    type: "me",
  },
  {
    id: 3,
    author: "Adam Smith",
    title: "Another Blog",
    content: "Lorem ipsum dolor sit amet...",
    type: "others",
  },
  {
    id: 4,
    author: "William Blake",
    title: "A Blog by Someone Else",
    content: "Lorem ipsum dolor sit amet...",
    type: "others",
  },
];

const backgroundStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
};


const Blogs: React.FC = () => {
  const [activeType, setActiveType] = useState<"me" | "others">("me");

  const handleClick = (type: "me" | "others") => {
    setActiveType(type);
  };

  const filteredBlogs = BLOGS_DATA.filter((blog) => blog.type === activeType);

  return (
    <div style={backgroundStyle}>
    <nav className="BlogsNav">
        <button onClick={() => handleClick("me")}>By Me</button>
        <button onClick={() => handleClick("others")}>By Others</button>
      </nav>
      <ul>
        {filteredBlogs.map((blog) => (
          <li key={blog.id}>
            <h3>
              <a href={`/blog/${blog.id}`}>{blog.title}</a>
            </h3>
            {/* <p>{blog.author}</p> */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Blogs;
