import THREE from 'three';
window.THREE = THREE;
import Cube from './objects/Cube';
import dat from 'dat-gui';

export default class Webgl {
  constructor( width, height ) {
    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera( 50, width / height, 1, 1000 );
    this.camera.position.z = 100;

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize( width, height );
    this.renderer.setClearColor( 0x262626 );

    this.composer = null;

    this.cube = new Cube();
    this.cube.position.set( 0, 0, 0 );
    this.scene.add( this.cube );

    this.initGui();
  }

  initGui() {
    this.params = {
      color: '#00ff00',
    };
    this.gui = new dat.GUI();
    this.gui.addColor( this.params, 'color' );
  }

  resize( width, height ) {
    if ( this.composer ) {
      this.composer.setSize( width, height );
    }

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize( width, height );
  }

  render() {
    this.renderer.render( this.scene, this.camera );
    this.cube.update();
  }
}
