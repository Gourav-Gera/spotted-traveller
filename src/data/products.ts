export interface Product { id:string; title:string; price:number; category:string; gender:string; image:string; images:string[]; description:string; }
export const products: Product[] = Array.from({length:12}).map((_,i)=>{
  const n=i+1;
  return {
    id:`prod-${n}`,
    title:'Male Trending T-shirt',
    price:100,
    category: n%4===0? 'Cloths': n%4===1? 'Jewelry': n%4===2? 'Footwear':'Cloths',
    gender: n%3===0? 'Male': (n%3===1? 'Female':'Unisex'),
    image:`/images/product-img-${n}.png`,
    images:[`/images/product-img-${n}.png`,`/images/product-img-${(n%12)+1}.png`,`/images/product-img-${(n+1)%12+1}.png`,`/images/product-img-${(n+2)%12+1}.png`],
    description:'Suspendisse potenti. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer id feugiat libero.'
  };
});
