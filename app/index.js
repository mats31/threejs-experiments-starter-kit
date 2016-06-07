/* Import experiments here */
import Webgl0 from './xp/1/Webgl';
import Webgl1 from './xp/2/Webgl';
/* ---------------------------- */

import raf from 'raf';
import dat from 'dat-gui';
import 'gsap';

// Current project
let index = 0;
let webgl;
let webglRaf;

/* Add experiments here */
const projects = {
  Webgl0: Webgl0,
  Webgl1: Webgl1,
};
const projectNames = [ 'Hello World', 'Uniforms' ];
const params = {
  project: projectNames[index],
};
/* --------------------------------------------- */

// Functions
function animate() {
  webglRaf = raf(animate);

  webgl.render();
}

function killProject() {
  // Remove canvas
  if ( typeof webgl.renderer !== 'undefined' ) document.body.removeChild( webgl.renderer.domElement );
  // Remove gui of webgl class if exists
  if ( typeof webgl.gui !== 'undefined' ) {
    for ( let i = 0; i < document.querySelectorAll( '.dg.main.a' ).length; i++) {
      const item = document.querySelectorAll( '.dg.main.a' )[i];
      if ( i > 0 ) {
        item.parentElement.removeChild( item );
      }
    }
  }
  webgl = null;
  raf.cancel(webglRaf);
}

function launchProject( index ) {
  const CurrentWebgl = projects['Webgl' + index];
  webgl = new CurrentWebgl( window.innerWidth, window.innerHeight );
  document.body.appendChild( webgl.renderer.domElement );

  // let's play !
  animate();
}

function resizeHandler() {
  webgl.resize( window.innerWidth, window.innerHeight );
}

// Project GUI settings
const projectGui = new dat.GUI();
projectGui
  .add(params, 'project', projectNames )
  .listen()
  .onChange( ( nextProject ) => {
    for ( let i = 0; i < projectNames.length; i++ ) {
      if ( projectNames[i] === nextProject ) {
        killProject();
        launchProject( i );
      }
    }
  });

// handle resize
window.addEventListener('resize', resizeHandler);

launchProject( 0 );
