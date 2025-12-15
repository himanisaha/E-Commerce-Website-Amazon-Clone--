import React from 'react';
import styled from 'styled-components';

const BoxContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 16px;
  margin-bottom: 32px;
`;

const Box = styled.div`
  background: white;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 16px;
  cursor: pointer;
  transition: box-shadow 0.2s ease;

  &:hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  h5 {
    margin: 0 0 12px 0;
    font-size: 18px;
    font-weight: 600;
  }

  .box-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;
    margin-bottom: 12px;
  }

  .box-item {
    background: #f5f5f5;
    border-radius: 4px;
    padding: 8px;
    text-align: center;
    font-size: 12px;

    img {
      width: 100%;
      height: 80px;
      object-fit: contain;
      margin-bottom: 4px;
    }
  }

  .box-link {
    color: #007185;
    text-decoration: none;
    font-size: 14px;
    font-weight: 500;

    &:hover {
      text-decoration: underline;
    }
  }
`;

function CategoryBoxes() {
  const categories = [
    {
      title: 'Pick up where you left off',
      items: [
        { name: 'Keyboard', image: 'https://via.placeholder.com/120x80?text=Keyboard' },
        { name: 'Mouse', image: 'https://via.placeholder.com/120x80?text=Mouse' },
      ],
      link: 'See more',
    },
    {
      title: 'Keep shopping for',
      items: [
        { name: 'Back braces', image: 'https://via.placeholder.com/120x80?text=Braces' },
        { name: 'Photo frames', image: 'https://via.placeholder.com/120x80?text=Frames' },
      ],
      link: 'See more',
    },
    {
      title: 'Continue shopping deals',
      items: [
        { name: 'Jewelry', image: 'https://via.placeholder.com/120x80?text=Jewelry' },
        { name: 'Electronics', image: 'https://via.placeholder.com/120x80?text=Electronics' },
      ],
      link: 'See more deals',
    },
    {
      title: 'Get wholesale pricing',
      items: [
        { name: 'Amazon Business', image: 'https://via.placeholder.com/120x80?text=Business' },
        { name: 'Switch account', image: 'https://via.placeholder.com/120x80?text=Switch' },
      ],
      link: 'Switch account now',
    },
  ];

  return (
    <BoxContainer>
      {categories.map((category, idx) => (
        <Box key={idx}>
          <h5>{category.title}</h5>
          <div className="box-content">
            {category.items.map((item, i) => (
              <div key={i} className="box-item">
                <img src={item.image} alt={item.name} />
                <p>{item.name}</p>
              </div>
            ))}
          </div>
          <a href="#" className="box-link">
            {category.link}
          </a>
        </Box>
      ))}
    </BoxContainer>
  );
}

export default CategoryBoxes;
