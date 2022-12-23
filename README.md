# Where in the world - REST Countries API

his is a solution to the [REST Countries API with color theme switcher challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/rest-countries-api-with-color-theme-switcher-5cacc469fec04111f7b848ca).

## Overview

### The challenge

Users should be able to:

- See all countries from the API on the homepage
- Search for a country using an `input` field
- Filter countries by region
- Click on a country to see more detailed information on a separate page
- Click through to the border countries on the detail page
- Toggle the color scheme between light and dark mode

### Screenshot

![Where-in-the-world light mode](https://user-images.githubusercontent.com/91159544/177341072-26b28e7e-26df-4564-82b6-6662910064ed.png)

![Where-in-the-world dark mode](https://user-images.githubusercontent.com/91159544/177341079-ddda7cb9-937b-4783-9058-5b0ce05e8c49.png)

### Links

- Code URL: [https://github.com/emil6957/where-in-the-world](https://github.com/emil6957/where-in-the-world)

- Live site URL: [https://emil6957.github.io/where-in-the-world/](https://emil6957.github.io/where-in-the-world/)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid
- Mobile-first workflow
- [React](https://reactjs.org/) - JS library
- [React bootstrap](https://react-bootstrap.github.io/) (Used for spinners when loading data)

### What I learned

One of the things I learnt is using conditional rendering to show that data is loading.

If the data is loading it will display a spinner until it's all been loaded in.
```js
<div className="home__cards-container">
				{loading ? <Spinner className="home__spinner" variant={isDarkMode ? "light" : "dark"} animation="border" size="lg" /> : countryElements }
</div>
```

This project also taught me how to do dynamic routing with react allowing the user to navigate through to the details page of any country and 
having page not disapear upon refreshing the page.

Here I have a route to `/details/:name` with `:name` being a parameter in the URL for the country.
```js
<Routes>
					<Route path="/" element={<Home loading={loading} isDarkMode={isDarkMode} countries={countries} />} />
					<Route path="/details/:name" element={<Details countries={countries} />} />
</Routes>
```

And here I use the `name` parameter to fetch the data from the REST API to display
```js
const { name } = useParams();

useEffect(() => {
    setLoading(true);
    setCountry();
    setBorders([]);
    async function getData() {
        const res = await fetch(`https://restcountries.com/v3.1/name/${name}?fullText=true`);
        const data = await res.json();
        await setCountry(data[0]);
        await setLoading(false);
    }
    const unSub = getData();
    return () => unSub;
}, [name])
```

I've also learnt about loading data asynchronously and using `Promise.all` when fetching for several pieces of data

Here i am mapping all the fetches into the `promises` variable which I then wait for all of them to be complete to set the borders.
While this is happening the code above this one is also running to load in the country.
```js
useEffect(() => {
    async function getBorders() {
        const promises = await country.borders.map(async (border) => {
            const res = await fetch(`https://restcountries.com/v3.1/alpha/${border}`);
            const data = await res.json();
            return data[0].name.common;
        })
        const borders = await Promise.all(promises);
        setBorders(borders);
    }
    if(loading === false && country.borders) {
        getBorders();
    }
}, [loading, country]);
```

### Useful resources

- [https://v5.reactrouter.com/web/example/url-params](https://v5.reactrouter.com/web/example/url-params) - This page showed me how I can implement URL parameters
- [https://www.youtube.com/watch?v=scVRfoTEctc&ab_channel=Arslan](https://www.youtube.com/watch?v=scVRfoTEctc&ab_channel=Arslan) - This viedo showed me how I can display a spinner while the data is loading
