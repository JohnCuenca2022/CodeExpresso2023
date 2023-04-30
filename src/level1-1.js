import { addAllNavbarAnimations, addAllNavbarFunctionality, addProfileButtonFunctionality, displayToast } from './general/essentials';
import { getAudioSrc, addAudioElementToBody, addSoundEffect} from './general/audioEssentials';
import { auth, loginWithGoogle, loginWithEmailAndPassword, createDefaultGoogleUser } from './firebase/userEssentials';

import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc, getDocs, collection, setDoc } from 'firebase/firestore';

import $ from 'jquery';

//css
import 'bootstrap/dist/css/bootstrap.min.css';
import "nes.css/css/nes.min.css";
import "../styles/essentials.css";
import "../styles/profile.css";
// import "../styles/game.css";

//phaser
import Phaser from 'phaser';
import tileImage from '../assets/gameImages/tiles.png';
import bot from '../assets/gameImages/bot.png';
import bunnybot from '../assets/gameImages/bunny_bot_spritesheet.png';
import tileMap from '../assets/gameImages/map.json';
// console.log(bot);

// ********** ESSENTIALS **********
// essentials
addAllNavbarAnimations();
addAllNavbarFunctionality();

// Toasts
// displayToast("Achievement Unlocked", "Great Job!");

// background music
addAudioElementToBody('background-music', getAudioSrc('mute'));

// sound effects
addSoundEffect("btn-sound");


document.getElementById("profile").addEventListener("click", function(){
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
  
      addProfileButtonFunctionality(user);
    } else {
      addProfileButtonFunctionality(user);
    }
  });
});

// -------------------------------------


window.onload = function () {
    codeEditor();
};

function codeEditor() {
    var editor = ace.edit("editor");

    console.log(editor)

    editor.setTheme("ace/theme/twilight"); //theme
    editor.session.setMode("ace/mode/java"); //syntax highlighting
    editor.setOptions({
        fontSize: "15pt"
    });

    let javacode = `public class Main{
    public static void main(String args[]){
        // System.out.println("CodeExpresso");
    }
}`;
    console.log("hello world")
    editor.setValue(javacode)

    $(document).ready(function () {
        $("#run").click(function () {
            let code = editor.getValue();
            let input = $("#inputArea").val()
            
            $("#ans").html("Loading...");

            //get code and user input
            
            var data = Qs.stringify({
                code: code,
                language: "java",
                input: input,
            });

            //format data for API call
            var config = {
                method: "post",
                url: "https://api.codex.jaagrav.in",
                headers: {
                  "Content-Type": "application/x-www-form-urlencoded",
				  "Access-Control-Allow-Origin": "*"
                },
                data: data,
            };
              
            //API call
            axios(config)
            .then(function (response) {
                console.log(response)
                if(response.data.output){
                    var output = response.data.output;
                    $("#ans").html(output);
                }else if(response.data.error){
                    $("#ans").html(response.data.error);
                }else{
                    $("#ans").html('');
                }
                
            })
            .catch(function (error) {
                console.log(error);
            });

        });
    });
} 

// --------------- PHASER ---------------

let config = {
    type: Phaser.AUTO, //rendering
    parent: "gameContent", //parent element
    width: 600,
    height: 780,
    backgroundColor: "#FFFFFF",
    pixelArt: true,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 500 }, // will affect our player sprite
            debug: false // change if you need
        }
    },
    scene: {
      preload: preload,
      create: create,
      update: update
    }
};
  
let game = new Phaser.Game(config);

let map;
let player;
  
function preload() {
  // Load the tileset image
  this.load.spritesheet('player', bunnybot, { frameWidth: 32, frameHeight: 32 });
  this.load.spritesheet('spritesheetKey', tileImage, {
    frameWidth: 32,
    frameHeight: 32
  });
  
}

function create() {
  
  // this.player = this.add.sprite(100, 100, 'player');
  player = this.physics.add.sprite(100, 100, 'player');
  this.physics.world.gravity.y = 0;
  player.body.setGravity(0, 0); // Set both X and Y gravity to zero
  player.body.setVelocity(0, 0); // Set the initial velocity to zero

  // create animation
  this.anims.create({
    key: 'walk',
    frames: this.anims.generateFrameNumbers('player', { start: 0, end: 9 }),
    frameRate: 6,
    repeat: -1
  });

  // play the animation
  player.anims.play('walk', true);
  

  // BORDER COLLISION
  // get the width and height of the game canvas
  const { width, height } = this.sys.game.canvas;
  // set the bounds of the physics world to match the canvas size
  this.physics.world.setBounds(0, 0, width, height);
  // set the player sprite to collide with the bounds of the physics world
  player.setCollideWorldBounds(true);
}

function update(){
  const speed = 200;
  const cursors = this.input.keyboard.createCursorKeys();

    // Move the player sprite by 10 pixels to the right
  if (cursors.right.isDown) {
    var targetX = player.x + 50;
    this.tweens.add({
      targets: player,
      x: targetX,
      duration: 150,
      ease: 'Linear',
      onComplete: function () {
        player.setVelocityX(0);
      }
    });
  };
  
  // Move the player sprite by 10 pixels to the left
  if (cursors.left.isDown) {
    var targetX = player.x - 50;
    this.tweens.add({
      targets: player,
      x: targetX,
      duration: 150,
      ease: 'Linear',
      onComplete: function () {
        player.setVelocityX(0);
      }
    });
  }
  
  // Move the player sprite by 10 pixels upwards
  if (cursors.up.isDown) {
    var targetY = player.y - 50;
    this.tweens.add({
      targets: player,
      y: targetY,
      duration: 150,
      ease: 'Linear',
      onComplete: function () {
        player.setVelocityX(0);
      }
    });
  }
  
  // Move the player sprite by 10 pixels downwards
  if (cursors.down.isDown) {
    var targetY = player.y + 50;
    this.tweens.add({
      targets: player,
      y: targetY,
      duration: 150,
      ease: 'Linear',
      onComplete: function () {
        player.setVelocityX(0);
      }
    });
  }
}