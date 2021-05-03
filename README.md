<h1 align="center">Map Visualization of UNICEF Digital Public Goods <br/> Developments and Implementations</h1>

This repository was conceived as a very simple tool to visualize on a map the multiple dimensions of data related to the geographic extent of digital public goods. 

## 🤔 Rationale

The design requirements were as follows:

1. Data should be easily editable
2. Data should be displayed on a world map
3. Data would be multidimensional, and the visualization should layer multiple dimensions
4. Visualization should be easily customizable to meet the communications needs of the team

The above requirements were addressed with the following strategies:

1. Data is displayed on a world map using Mapbox, and integrated on the React frontend through the [react-mapbox-gl](https://www.npmjs.com/package/react-mapbox-gl) bindings for [React GL JS](https://docs.mapbox.com/mapbox-gl-js/api/).

2. Each dimension is visualized in its own layer, whose visibility can be toggled individually. Overlapping layers use a combination of background colors with transparency that can be combined for those layers with the larger number of countries.

3. Theming can easily be modified through CSS.

## 🛠 Architecture

This webapp is built using [Next.js](https://nextjs.org/) as a React Framework and deployed using [Vercel](https://vercel.com/). [Bootstrap](https://getbootstrap.com/) is used as the baseline theme. This application is as simple as it gets: it consists of one page and one component.

* `pages/_app.js` is the application entry point, which loads the required stylesheets and loads `index.js`
* `pages/index.js` wraps most of the logic of the application:
    - displays a fixed sidebar 
    - loads the MapComponent from `components/mapComponents.js`
* `components/mapComponent.js` loads the Mapbox map, adds a layer for each dataset, programmatically creates a popup for each country, and programmatically build s a navbar menu to toggle the visibility of each layer

## ✏️ Configuration

In order to run this application, you need to open an account with [Mapbox](https://www.mapbox.com/) to obtain an *Access Token*. The following [environment variable](https://nextjs.org/docs/basic-features/environment-variables) need to be set in `.env` or `.env.local`:
```
NEXT_PUBLIC_ACCESS_TOKEN="MAPBOX_ACCESS_TOKEN"
```

## 💻 Development Environment

Setup your development environment as follows:

1. Clone this repo:
    - SSL:
    ```bash
    git clone git@github.com:rachita19082/dpga-map-visualization.git
    ```
    - HTTPS:
    ```bash
    git clone https://github.com/rachita19082/dpga-map-visualization.git
    ```
2. Install project dependencies:
    ```bash
    cd dpga-map-visualization
    npm install
    ```
3. After having set up the proper [Configuration](#%EF%B8%8F-configuration), run the development server with [fast refresh](https://nextjs.org/docs/basic-features/fast-refresh):
    ```bash
    npm run dev
    ```

This project has been developed after modifying the orginal source code from the [Visualization of UNICEF Office of Innovation (OoI) repository](https://github.com/lacabra/ooi-project-visualization) which is licensed under the [GNU General Public License](LICENSE)


