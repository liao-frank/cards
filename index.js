import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

// Plane and planeHelper
const plane = new THREE.Mesh(
	new THREE.PlaneGeometry(10, 10, 1, 1), 
	new THREE.MeshBasicMaterial({color:0xffffff, side: THREE.DoubleSide}));
scene.add(plane);

// Construct the cube
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( geometry, material );
scene.add(cube);

// Camera Position
camera.position.x = 0;
camera.position.y = -5;
camera.position.z = 10;
camera.lookAt(0, 0, 0);

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
document.addEventListener('mousemove', onDocumentMouseMove, false);

function onDocumentMouseMove(event) {
	mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
	mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
	raycaster.setFromCamera( mouse, camera );
	const intersects = raycaster.intersectObject(plane);
	for (const intersect of intersects) {
		cube.position.x = intersect.point.x;
		cube.position.y = intersect.point.y;
		console.log(cube.position.x, cube.position.y);
	}
}

function animate() {
	requestAnimationFrame( animate );
	renderer.render( scene, camera );
}
animate();