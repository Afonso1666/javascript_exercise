const url = 'https://jsonplaceholder.typicode.com/users';
const url2 = 'https://jsonplaceholder.typicode.com/posts';

function get() {
  try {
    fetch(url)
      .then(response => response.json())
      .then(data => {
        const users = data.map(user => {
          return {
            id: user.id,
            name: user.name,
            username: user.username,
            email: user.email,
            address: {
              street: user.address.street,
              suite: user.address.suite,
              city: user.address.city,
              zipcode: user.address.zipcode,
              geo: {
                lat: user.address.geo.lat,
                lng: user.address.geo.lng
              }
            },
            phone: user.phone,
            website: user.website,
            company: {
              name: user.company.name,
              catchPhrase: user.company.catchPhrase,
              bs: user.company.bs
            },
            posts: fetch(url2)
              .then(response => response.json())
              .then(data => {
                return data.filter(post => post.userId === user.id);
              })
          }
        })
        console.log(users);
        let items = [];
        for (let i = 0; i < users.length; i++) {
          items += `${users[i].name}<br>`;
        }
        document.querySelector("main").innerHTML = `
          ${items}
        `;
      })
  } catch (error) {
    console.log(error);
  }
}

get();