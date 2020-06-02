import THREELib from "three-js";
const THREE = THREELib();

window.onload = function() {

    let container, camera, scene, renderer, effect;
    let mouseX = 0;
    let mouseY = 0;
    let windowHalfX = window.innerWidth / 2;
    let windowHalfY = window.innerHeight / 2;
    document.addEventListener( 'mousemove', onDocumentMouseMove, false );
    init();
    animate();

    function init() {
        
        const width = window.innerWidth;
        const height = window.innerHeight;
        let canvas = document.getElementById('canvas' );
        
        canvas.setAttribute('width', width);
        canvas.setAttribute('height', height);

        renderer = new THREE.WebGLRenderer({canvas: canvas, antialias : true});

        scene = new THREE.Scene();
        scene.background = new THREE.Color( 0x100e11 );

        camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 10000);
        camera.position.set(0, 0, 600);

        let loader = new THREE.FontLoader();
        loader.load( 'helvetiker_regular.typeface.json', function ( font ) {
            let color = 0xeeeeee;
            let matDark = new THREE.LineBasicMaterial( {
                    color: color,
                    side: THREE.DoubleSide
                } );
            let matLite = new THREE.MeshBasicMaterial( {
                color: color,
                transparent: true,
                opacity: 0.8,
                side: THREE.DoubleSide
            } );

            let message;
            if (window.innerWidth > 500) message = "StudyNode";
            else  message = "SN";
            let shapes = font.generateShapes( message, 100 );
            let geometry = new THREE.ShapeBufferGeometry( shapes );
            geometry.computeBoundingBox();
            let xMid = - 0.5 * ( geometry.boundingBox.max.x - geometry.boundingBox.min.x );
            geometry.translate( xMid, 0, 0 );
            geometry.translate( xMid, 0, 0 );
            text = new THREE.Mesh( geometry, matLite );
            if (window.innerWidth > 500) {
                text.position.x = 350;
                text.position.z = - 150;
            } else {
                text.position.x = 75;
                text.position.z = - 150; 
            }
            scene.add( text );
            
        });
    }
    function onDocumentMouseMove( event ) {
        mouseX = ( event.clientX - windowHalfX ) / 5;
        mouseY = ( event.clientY - windowHalfY ) / 5;
    }
    function animate() {
        requestAnimationFrame( animate );
        render();
    }
    function render() {
        camera.position.x += ( mouseX - camera.position.x ) * .05;
        camera.position.y += ( - mouseY - camera.position.y ) * .05;
        camera.lookAt( scene.position );
        
        renderer.render( scene, camera );
    }


    window.addEventListener( 'resize', onWindowResize, false );

    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize( window.innerWidth, window.innerHeight );
    }

}