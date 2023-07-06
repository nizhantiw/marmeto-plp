// import logo from './logo.svg';
import './App.css';
import React,{useEffect, useState} from 'react';

const Url_Api='https://mocki.io/v1/0934df88-6bf7-41fd-9e59-4fb7b8758093';
const ProductCard=({product, isGrid})=> {
  return(
    <div className={`item ${isGrid ? 'grid-view' : ''}`}>
      {isGrid ? (
        <>
        <img src={product.image} alt={product.name} />
        <h3>{product.name}</h3>
        <span>{product.variants}</span>
        <span className='badge'>{product.badge}</span>
        </>
      ) : (
        <>
        <h3>{product.name}</h3>
        <span>{product.variants}</span>
        <img src={product.image} alt={product.name} />
        <span className='badge'>{product.badge}</span>
        </>
      )}
    </div>
  );
};


function App() {
  const [product, setProducts]=useState([]);
  const [isGrid, setIsGrid]=useState(false);
  const [searchKey, setSearchKey]=useState('');

  useEffect(()=>{
    fetchProducts();
  },[]);
  const fetchProducts=async ()=>{
    try{
      const res=await fetch(Url_Api);
      const data=await res.json();
      setProducts(data.product);
    }
    catch(error){
      console.error('Error in fetching products:', error);
      setProducts([]);
    };
  };
  const handleSearch=(e)=>{
    setSearchKey(e.target.value.trim());
  };
  const filterProduct=product && product.filter((product) =>
    product.product_var.some((variant)=>
    Object.values(variant)[0].toLowerCase().includes(searchKey.toLowerCase())
    )

  );

  return (
    <div>
      <div className='search-bar'>
        <input type='text' placeholder='Search...' value={searchKey} onChange={handleSearch}
      />
    </div>
    <div className='container'>
      {filterProduct.map((product) =>(
        <ProductCard key={product.id} product={product} isGrid={isGrid} />
      ))}
    </div>
    <button onClick={() => setIsGrid(!isGrid)}>
      {isGrid ? 'List View' : 'Grid View'}
    </button>
    </div>
  );
};

export default App;
