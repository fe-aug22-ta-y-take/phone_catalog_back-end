export const description: string = `<h1>Ta-y-take_team server</h1>

<h2>GET to /products/phones - get interface PhonesResults
{ edges: Phone[], count: number } in json</h2>

<h2>GET to /products/phones?limit=16&offset=1&order=price&dir=asc - get PhonesResults
with first 16 phones sorted by price in ascending order
(order: price || new; dir: asc || desc)</h2>

<h2>GET to /products/phones?group=new - get PhonesResults
with only 2019 year phones
(group: new || discount)</h2>

<h2>GET to /products/phones/phoneId - get interface PhoneResults
{ phone: PhoneDetails, id: string, similar: Phone[] } in json</h2>

<h2>GET to /users/favorites?ids=1,33,5,7 - get Phone[] only with ids from query</h2>
<h2>GET to /users/cart?ids=1,33,5,7 - get Phone[] only with ids from query</h2>

<h2>GET to https://effulgent-elf-0da1cb.netlify.app/ + image value
from phone-object in phones.json - get appropriate image</h2>`;
