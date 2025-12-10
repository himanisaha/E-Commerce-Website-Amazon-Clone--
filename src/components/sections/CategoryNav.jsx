import React from 'react';
import './CategoryNav.css'; // optional custom styles

function CategoryNav() {
  const categories = [
    'All',
    'Rufus',
    'Fresh',
    'New Releases',
    'Amazon Business',
    'Sell',
    "Today's Deals",
    'Gift Cards',
    'Flights',
    'AmazonBasics',
    'MX Player',
    'Amazon Pay',
    'Buy Again',
    'Browsing History',
  ];

  return (
    <nav className="category-nav bg-dark text-white py-2 px-3">
      <div className="d-flex flex-nowrap" style={{ overflowX: 'auto' }}>
        {categories.map((cat, idx) => (
          <a
            key={idx}
            href="#"
            className="category-nav__link text-white text-decoration-none me-3 flex-shrink-0"
            style={{ fontSize: '13px', whiteSpace: 'nowrap' }}
          >
            {cat}
          </a>
        ))}
      </div>
    </nav>
  );
}

export default CategoryNav;
