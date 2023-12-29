import { Fragment,useEffect, useState } from "react";
import Loader from "./layouts/Loader"
import MetaData from "./layouts/MetaData";
import { getProducts } from "../actions/productAction";
import {useDispatch,useSelector} from "react-redux";
import Product from "./product/Product";
import {toast} from 'react-toastify';
import Pagination from 'react-js-pagination';

export default function Home(){
  
  const dispatch = useDispatch();
  const {products, loading, error,productsCount,resperPage} =    useSelector((state) => state.productsState)
  const [currentPage,setCurrentPage] = useState(1);
  console.log(currentPage)
  const setCurrentPageNo = (pageNo) =>{
    setCurrentPage(pageNo)
    dispatch(getProducts(null, null, null, null, pageNo));
  }

  useEffect(()=>{
    if(error){
        return toast.error(error,{
        position:toast.POSITION.BOTTOM_CENTER
      });

    }
   
    dispatch(getProducts(null,null,null,null,currentPage)) 
    }, [error,dispatch,currentPage])

    return (
        <Fragment>
            {loading ? <Loader/>:
            <Fragment>
            <MetaData title={'Best Products'} />
            <h1 id="products_heading">Latest Products</h1>
            <section id="products" class="container mt-5">
              <div class="row">
                { products && products.map(product=>(
                  <Product key={product._id} product={product}/>
                ))
              }
              </div>
            </section>
          
            <div className="d-flex justify-content-center mt-5">
              
              <Pagination
                activePage={currentPage}
                onChange={setCurrentPageNo}
                totalItemsCount={productsCount}
                itemsCountPerPage={resperPage}
                nextPageText={'Next'}
                firstPageText={'First'}
                lastPageText={'Last'}
                itemClass={'page-item'}
                linkClass={'page-link'}
              />

            </div>

            </Fragment>
            }
        </Fragment>
        
    )

}