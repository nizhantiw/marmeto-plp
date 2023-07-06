// import logo from './logo.svg';
import './App.css';
import React,{useEffect, useState} from 'react';

const Url_Api='https://mocki.io/v1/0934df88-6bf7-41fd-9e59-4fb7b8758093';
const ProductCard=({product, isGrid})=> {
  const {product_image, product_title, product_badge, product_variants}=product;
  
  return(
    <div className={`item ${isGrid ? 'grid-view' : ''}`}>
      {isGrid ? (
        <>
        <img src={product_image} alt={product_title} />
        <h3>{product_title}</h3>
        {product_variants.map((variant, index)=>(
          <span key={index}>{Object.values(variant)[0]}</span>
        ))}
        <span className='badge'>{product_badge}</span>
        </>
      ) : (
        <>
        <div className='list-item'>
        <h3>{product_title}</h3>
        {product_variants.map((variant, index)=>(
          <span key={index}>{Object.values(variant)[0]}</span>

        ))}
        <span className='badge'>{product_badge}</span>
        </div>
        <img src={product_image} alt={product_title} />
        
        </>
      )}
    </div>
  );
};


function App() {
  const [products, setProducts]=useState([]);
  const [isGrid, setIsGrid]=useState(false);
  const [searchKey, setSearchKey]=useState('');

  useEffect(()=>{
    fetchProducts();
  },[]);

  const fetchProducts=async ()=>{
    try{
      const res=await fetch(Url_Api);
      const data=await res.json();
      setProducts(data.data || []);
    }
    catch(error){
      console.error('Error in fetching products:', error);
      // setProducts([]);
    };
  };

  const handleSearch=(e)=>{
    setSearchKey(e.target.value.trim());
  };

  const filterProduct=products && products.filter((product) =>
    product.product_variants.some((variant)=>
    Object.values(variant)[0].toLowerCase().includes(searchKey.toLowerCase())
    )

  );

  return (
    <div className={`container ${isGrid ? 'grid-view' : 'list-view'}`}>
      <div className='search-bar'>
        <input type='text' placeholder='Search...' value={searchKey} onChange={handleSearch}
      />
     <div className="view-buttons">
          <button onClick={() => setIsGrid(false)}>List View</button>
          <button onClick={() => setIsGrid(true)}>Grid View</button>
        </div>
    </div>

    <div className='container'>
      {filterProduct && 
      filterProduct.map((product, index) =>(
        <ProductCard key={index} product={product} isGrid={isGrid} />
      ))}
    </div>
    
    </div>
  );
};

export default App;
