export const description: string = `<h1>This is a simple server for the <a href="https://fe-aug22-ta-y-take.github.io/phone_catalog_front-end/">Phone Catalog team pet-project</a></h1>

<h2 style="color:SeaGreen;">BASE_URL: https://effulgent-elf-0da1cb.netlify.app/.netlify/functions/server</h2>

<h2>GET to /products/phones</h2>
<h3 style="color:OrangeRed;">Response: interface PhonesResults
{ edges: Phone[], count: number }, where 'count' is total Phone[] length.</h3>

<h2>GET to /products/phones?limit=16&offset=1&order=price&dir=asc</h2>
<h3 style="color:OrangeRed;">Response: interface PhonesResults
with first 16 phones sorted by price in ascending order, where
'order' could be 'price' || 'new'; 'dir' could be 'asc' || 'desc'.</h3>

<h2>GET to /products/phones?group=new</h2>
<h3 style="color:OrangeRed;">Response: interface PhonesResults
with only latest years phones, where 'group' could be 'new' || 'discount'.</h3>

<h2>GET to /products/phones/phoneId</h2>
<h3 style="color:OrangeRed;">Response: interface PhoneResults
{ phone: PhoneDetails, id: string, similar: Phone[] }, where 'id' is current phone id from the general Phone[].</h3>

<h2>GET to /users/favorites?ids=1,33,5,7</h2>
<h2>GET to /users/cart?ids=1,33,5,7</h2>
<h3 style="color:OrangeRed;">Response: Phone[] including phones only with ids from query-param.</h3>

<h2>GET to https://effulgent-elf-0da1cb.netlify.app/ + 'image' value
from single phone-object in Phone[]</h2>
<h3 style="color:OrangeRed;">To get appropriate image for single Phone from static folder hosted on Netlify.</h3>`;
