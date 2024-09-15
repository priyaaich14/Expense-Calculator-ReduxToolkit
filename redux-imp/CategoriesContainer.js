//  import { useSelector, useDispatch } from "react-redux";
//  import { useEffect } from "react";
//  import { fetchCategories } from "./categoriesSlice";
//  import CategoriesForm from './CategoriesForm'
//  import  CategoriesList  from './CategoriesList'

// export default function CategoriesContainer(){
//     const {data : categories } = useSelector ((state) => {
//         return state.categories
//     })
//     const dispatch = useDispatch()
//     useEffect(() => {
//         dispatch(fetchCategories())
//     },[dispatch])
//     return (
//         <div className="row">
//             <h2>Listing Categories - { categories.length }</h2>
//             <div className="col-md-6" >
//                 <CategoriesList/>
//             </div>
//             <div className="col-md-6">
//                 <CategoriesForm/>
//             </div>
//         </div>
//     )
// }

///////////////////////////////////////////

// import { useSelector, useDispatch } from 'react-redux';
// import { useEffect, useState } from 'react';
// import { fetchCategories } from './categoriesSlice';
// import CategoriesForm from './CategoriesForm';
// import CategoriesList from './CategoriesList';

// export default function CategoriesContainer() {
//     const { data: categories } = useSelector((state) => state.categories);
//     const dispatch = useDispatch();
//     const [editCategoryId, setEditCategoryId] = useState(null);

//     useEffect(() => {
//         dispatch(fetchCategories());
//     }, [dispatch]);

//     return (
//         <div className="row">
//             <h2>Listing Categories - {categories.length}</h2>
//             <div className="col-md-6">
//                 <CategoriesList setEditCategoryId={setEditCategoryId} />
//             </div>
//             <div className="col-md-6">
//                 <CategoriesForm editCategoryId={editCategoryId} setEditCategoryId={setEditCategoryId} />
//             </div>
//         </div>
//     );
// }


////////////////////////////////////////////////////////
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchCategories } from './categoriesSlice';
import CategoryForm from './CategoriesForm';
import CategoryList from './CategoriesList';

export default function CategoriesContainer() {
  const [editCategoryId, setEditCategoryId] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <div className="row">
      <div className="col-md-6">
        <CategoryList setEditCategoryId={setEditCategoryId} />
      </div>
      <div className="col-md-6">
        <CategoryForm editCategoryId={editCategoryId} setEditCategoryId={setEditCategoryId} />
      </div>
    </div>
  );
}
