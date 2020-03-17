import React, { Component } from 'react';

import Hero from './components/Hero';
import GridCard from './components/GridCard';

class App extends Component {

  render() {
    return (

        <div className="global">
          <Hero />
          <main>
            <GridCard title={'Destacados'} description={'Las recomendaciones mas destacadas'}/>
          </main>
        </div>
    );
  }
}

export default App;
