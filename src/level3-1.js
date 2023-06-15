import { addAllNavbarAnimations, addAllNavbarFunctionality, addProfileButtonFunctionality, displayToast } from './general/essentials';
import { getAudioSrc, addAudioElementToBody, addSoundEffect} from './general/audioEssentials';
import { auth, db } from './firebase/userEssentials';

import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc, getDocs, collection, setDoc, updateDoc, increment, arrayUnion } from 'firebase/firestore';

import $ from 'jquery';
import { Modal } from 'bootstrap';

//css
import 'bootstrap/dist/css/bootstrap.min.css';
import "nes.css/css/nes.min.css";
import "../styles/essentials.css";
import "../styles/profile.css";
// import "../styles/game.css";

// Phaser
import Phaser from 'phaser';
import tileImage from '../assets/gameImages/tiles.png';
import tileSetTest from '../assets/gameImages/main_tileset_final.png';
import emptyTile from '../assets/gameImages/emptyTile.png';
import rightTile from '../assets/gameImages/rightTile.png';

// player skins
import bot from '../assets/gameImages/bot.png';
import bunnybot from '../assets/gameImages/bunny_bot_spritesheet.png';
import catbot from '../assets/gameImages/cat_bot_spritesheet.png';
import catbot2 from '../assets/gameImages/cat_bot2_spritesheet.png';
import catbanana from '../assets/gameImages/cat_banana_spritesheet.png';
import tileMap from '../assets/gameImages/map.json';


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
  onAuthStateChanged(auth, async (user) => {
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

    editor.setTheme("ace/theme/twilight"); // theme
    editor.session.setMode("ace/mode/java"); // syntax highlighting
    editor.setOptions({
        fontSize: "15pt",
    });

    let javacode = `public class Main{
    public static void main(String args[]){
        System.out.println("CodeExpresso");
    }
}`;
    
    editor.setValue(javacode);

    document.getElementById("run").addEventListener('click', async function(){
      let code = editor.getValue();
      let input = document.getElementById("inputArea").value;

      document.getElementById("ans").innerHTML = "Loading...";


      // API calls  
      let response = await oneCompilerAPI(code, input); // 1st API call (50rq / day | 10rq / second | 525ms delay)
      if (response) {
        console.log("oneCompilerAPI")
        document.getElementById("ans").innerHTML = response.stdout;
        return;
      } 
      
      response = await codeCompilerAPI(code, input); // 2nd API call (4000rq / month | 10rq / second | 3,502ms delay)
      if (response) {
        console.log("codeCompilerAPI")
        document.getElementById("ans").innerHTML = response.output;
        return;
      }
      
      response = await onlineCodeCompilerAPI(code, input) // 3rd API call (500rq / month | 5rq / second | 1,456ms delay)
      if (response) {
        console.log("onlineCodeCompilerAPI")
        document.getElementById("ans").innerHTML = response.output;
        return;
      }

      response = await javaCodeCompiler(code, input) // 4th API call (100rq / month | 1rq / second | 993ms delay)
      if (response) {
        console.log("javaCodeCompiler")
        document.getElementById("ans").innerHTML = response.output;
        return;
      }

    });

    // https://rapidapi.com/onecompiler-onecompiler-default/api/onecompiler-apis
    async function oneCompilerAPI(code, input){
      const axios = require('axios');

      const options = {
        method: 'POST',
        url: 'https://onecompiler-apis.p.rapidapi.com/api/v1/run',
        headers: {
          'content-type': 'application/json',
          'X-RapidAPI-Key': 'b73b411cc0mshd35f69dd29dd737p115fa0jsn4b3e3be739c5',
          'X-RapidAPI-Host': 'onecompiler-apis.p.rapidapi.com'
        },
        data: {
          language: 'java',
          stdin: input,
          files: [
            {
              name: 'main.java',
              content: code
            }
          ]
        }
      };

      try {
        const response = await axios.request(options);
        return response.data;

      } catch (error) {
        console.error(error);
        return false;
      }
    }

    // https://rapidapi.com/realbrain-realbrain-default/api/code-compiler10
    async function codeCompilerAPI(code, input){
      const axios = require('axios');

      const options = {
        method: 'POST',
        url: 'https://code-compiler10.p.rapidapi.com/',
        headers: {
          'content-type': 'application/json',
          'x-compile': 'rapidapi',
          'Content-Type': 'application/json',
          'X-RapidAPI-Key': 'b73b411cc0mshd35f69dd29dd737p115fa0jsn4b3e3be739c5',
          'X-RapidAPI-Host': 'code-compiler10.p.rapidapi.com'
        },
        data: {
          langEnum: [
            'php',
            'python',
            'c',
            'c_cpp',
            'csharp',
            'kotlin',
            'golang',
            'r',
            'java',
            'typescript',
            'nodejs',
            'ruby',
            'perl',
            'swift',
            'fortran',
            'bash'
          ],
          lang: 'java',
          code: code,
          input: input
        }
      };

      try {
        const response = await axios.request(options);
        return response.data;

      } catch (error) {
        console.error(error);
        return false;

      }
    }

    // https://rapidapi.com/Glavier/api/online-code-compiler
    async function onlineCodeCompilerAPI(code, input){
      const axios = require('axios');

      const options = {
        method: 'POST',
        url: 'https://online-code-compiler.p.rapidapi.com/v1/',
        headers: {
          'content-type': 'application/json',
          'X-RapidAPI-Key': 'b73b411cc0mshd35f69dd29dd737p115fa0jsn4b3e3be739c5',
          'X-RapidAPI-Host': 'online-code-compiler.p.rapidapi.com'
        },
        data: {
          language: 'java',
          version: 'latest',
          code: code,
          input: input
        }
      };

      try {
        const response = await axios.request(options);
        return response.data;

      } catch (error) {
        console.error(error);
        return false;
      }
    }

    // https://rapidapi.com/UnlimitedAPI/api/java-code-compiler
    async function javaCodeCompiler(code, input){
      const axios = require('axios');

      const options = {
        method: 'POST',
        url: 'https://java-code-compiler.p.rapidapi.com/',
        headers: {
          'content-type': 'application/json',
          'X-RapidAPI-Key': 'b73b411cc0mshd35f69dd29dd737p115fa0jsn4b3e3be739c5',
          'X-RapidAPI-Host': 'java-code-compiler.p.rapidapi.com'
        },
        data: {
          code: code,
          input: input,
          version: 'latest'
        }
      };

      try {
        const response = await axios.request(options);
        return response.data;

      } catch (error) {
        console.error(error);
        return false;
      }
    }

}

// --------------- PHASER ---------------
onAuthStateChanged(auth, async (user) => {
  const docRefUser = doc(db, "users", user.uid); //USER
  const docSnapUser = await getDoc(docRefUser);

  let userSkin = docSnapUser.data().skin;

  createGame(userSkin);
})

// document.body.addEventListener('click', function(){
//   console.log(document.activeElement);
  
//   console.log(document.getElementById("gameCanvas"));

//   console.log(document.activeElement == document.getElementById("gameCanvas"));
// })

//left graphic
//middle instruction
//right game

function createGame(userSkin){
  let config = {
    type: Phaser.AUTO, //rendering
    parent: "gameContent", //parent element
    width: 32*19,
    height: 32*24,
    // backgroundColor: "#FFFFFF",
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
  let inventory;
  let itemSlots;
  let selectedItemIndex = -1;
  let cursorKeys;

  function preload() {
    switch (userSkin) {
      case "skin1":
        this.load.spritesheet('player', bunnybot, { frameWidth: 32, frameHeight: 32 });
        break;

      case "skin2":
        this.load.spritesheet('player', catbot2, { frameWidth: 32, frameHeight: 32 });
        break;

      case "skin3":
        this.load.spritesheet('player', catbot, { frameWidth: 32, frameHeight: 32 });
        break;

      case "skin4":
        this.load.spritesheet('player', catbanana, { frameWidth: 32, frameHeight: 32 });
        break;
    
      default:
        this.load.spritesheet('player', bot, { frameWidth: 32, frameHeight: 32 });
        break;
    }

    this.load.image("tiles", tileSetTest);
    this.load.image("rightTile", rightTile);
  }

  
  function create() {
    // canvas
    const canvas = this.sys.game.canvas;
    canvas.tabIndex = 0;
    canvas.focus();
    canvas.id = "gameCanvas";

    canvas.addEventListener('click', handleClick);
      
    function handleClick(event) {
      canvas.focus();
    }

    // Disable key capture for the cursor keys in the Input Plugin
    this.input.keyboard.disableGlobalCapture();

    // Create cursor keys manually
    cursorKeys = this.input.keyboard.addKeys('UP,DOWN,LEFT,RIGHT,SHIFT,ENTER');
    
    // Player
    player = this.physics.add.sprite(0, 0, 'player');
    this.physics.world.gravity.y = 0;
    player.body.setGravity(0, 0); // Set both X and Y gravity to zero
    player.body.setVelocity(0, 0); // Set the initial velocity to zero
    
    player.setDepth(1); 
    
    // Player animation
    this.anims.create({
      key: 'walk',
      frames: this.anims.generateFrameNumbers('player', { start: 0, end: 8 }),
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

    // TILES
    const level = [
      [  1,   4,   4,   4,   4,   4,   4,   4,   4,   4,   5,   0,   0,   0,   0,   0,   0,   26,   27],
      [  0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   4,   4,   4,   4,   4,   4,   4,  36,   37],
      [  0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   5,   0],
      [  0,   28,   29,   6,   6,   6,   6,   6,   6,   6,   6,   6,   6,   6,   6,   6,   6,   6,   0],
      [  0,   38,   39,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0],
      [  0,   0,   5,   0,   0,   4,   4,   4,   4,   4,   42,   43,   4,   4,   4,   4,   4,   4,   0],
      [  0,   0,   5,   0,   0,   7,   0,   0,   7,   0,   52,   53,   0,   0,   0,   0,   0,   5,   0],
      [  0,   0,   5,   0,   0,   7,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   5,   0],
      [  0,   0,   5,   0,   0,   7,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   5,   0],
      [  0,   40,   41,   0,   0,   7,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   5,   0],
      [  0,   50,   51,   4,   4,   4,   0,   5,   6,   6,   6,   6,   7,   0,   0,   0,   0,   5,   0],
      [  0,   0,   0,   0,   0,   0,   0,   5,   0,   0,   0,   0,   7,   0,   0,   0,   0,   5,   0],
      [  0,   0,   0,   0,   0,   0,   0,   5,   0,   0,   0,   0,   7,   0,   0,   0,   44,   45,   0],
      [  0,   6,   6,   6,   6,   6,   46,   47,   0,   0,   0,   0,   7,   6,   6,   6,   54,   55,   0],
      [  0,   5,   0,   0,   0,   0,   56,   57,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0],
      [  0,   5,   0,   0,   0,   0,   0,   4,   4,   24,   25,   4,   4,   5,   0,   0,   0,   0,   0],
      [  0,   5,   0,   0,   0,   0,   0,   7,   0,   34,   35,   0,   0,   26,   27,   0,   0,   0,   0],
      [  0,   4,   4,   20,   21,   4,   4,   7,   0,   0,   0,   0,   0,   36,   37,   4,   4,   22,   23],
      [  0,   0,   0,   30,   31,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   32,   33],
    ];
  
    // When loading from an array, make sure to specify the tileWidth and tileHeight
    map = this.make.tilemap({ data: level, tileWidth: 32, tileHeight: 32 });
    const tiles = map.addTilesetImage("tiles");
    const layer = map.createLayer(0, tiles, 0, 0);
    layer.setCollisionBetween(0, 1000);

    this.physics.add.collider(player, layer);

    layer.setInteractive();
    layer.on('pointerdown', (pointer, localX, localY, event) => {
        // Convert pointer coordinates to tile coordinates
        const tileX = layer.worldToTileX(pointer.worldX);
        const tileY = layer.worldToTileY(pointer.worldY);

        // Get the tile at the clicked coordinates
        const tile = map.getTileAt(tileX, tileY, true, layer);

        if (tile) {
          console.log('Clicked tile:', tile);
          // Perform actions based on the clicked tile

          let index = tile.index;
          if (index != 1 && index != 3 && selectedItemIndex != -1){
            tile.index = selectedItemIndex;
          }
        }
    });


    // // Player Inventory
    // const inventoryWidth = 320;
    // const inventoryHeight = 32;
    // let inventoryContainerPositionX = 32*5;
    // let inventoryContainerPositionY = 32*22;

    // // Create an array of inventory slots
    // const inventorySlots = [];

    // // Add inventory slot sprites to the scene and make them interactive
    // for (let i = 0; i < 10; i++) {
    //   const slot = this.add.sprite(inventoryContainerPositionX + i * 32, inventoryContainerPositionY, 'emptyTile');
    //   slot.setInteractive();
    //   inventorySlots.push(slot);
    // }

    // // Add click event listeners to inventory slots
    // inventorySlots.forEach((slot, index) => {
    //   slot.on('pointerdown', () => {
    //     handleInventoryItemClick(slot, index);
    //   });
    // });

    // // Handle inventory item click
    // function handleInventoryItemClick(slot, index) {
    //   // Perform actions based on the clicked inventory slot
    //   console.log('Clicked inventory slot:', slot);
    //   console.log('Clicked inventory index:', index);

    //   // Example: Toggle selection effect
    //   // slot.toggleTint();
    //   if (slot.isTinted) {
    //     slot.clearTint();
    //   } else {
    //     selectedItemIndex = index;
    //     inventorySlots.forEach( slot => {
    //       slot.clearTint();
    //     });
    //     slot.setTint(0xff9000);
    //   }
    // }

  }


  let hasWon = false;
  let hasDied = false;

  //one action at a time flag
  // let buttonPressedRight = false;
  // let buttonPressedDown = false;
  // let buttonPressedLeft = false;
  // let buttonPressedUp = false;
  let buttonPressedSpace = false;

  let canMove = true;

  function update(){
    const tileSize = 32;
    const movementDelay = 200; // milliseconds

    let tile = map.getTileAtWorldXY(player.x, player.y);

    if(!tile){
      //reset player to start if the player is out of bounds
      player.setVelocityX(0);
      player.setVelocityY(0);
      player.setPosition(0, 0);

      return;
    }

    // console.log(tile);
    // console.log("tile: ", tile.index);

    let index = tile.index;
    // console.log(canMove);

    if(index == 1 && canMove){
      // canMove = false;
      // movePlayerRight();
    }

    let canvas = document.getElementById("gameCanvas");

    // start
    if(cursorKeys.ENTER.isDown && !buttonPressedSpace && index == 1 && document.activeElement == canvas){
      player.setPosition(player.x + tileSize, player.y);
      buttonPressedSpace = true;
    }

    if (cursorKeys.ENTER.isDown) {
      // Reset the flag when the button is released
      buttonPressedSpace = false;
    }

    // reset
    if(cursorKeys.SHIFT.isDown && !buttonPressedSpace && document.activeElement == canvas){
      player.setVelocityX(0);
      player.setVelocityY(0);
      player.setPosition(0, 0);
      buttonPressedSpace = true;
      return;
    }

    if (cursorKeys.SHIFT.isDown) {
      // Reset the flag when the button is released
      buttonPressedSpace = false;
    }
    
    // movement tiles
    if(index == 0){
      // console.log(tile);
      // tile.index = 1;
      player.setVelocityX(0);
      player.setVelocityY(0);
      player.setPosition(0, 0);
    }

    if(index == 4 && canMove){
      canMove = false;
      movePlayerRight();
      return;
    }

    if(index == 5 && canMove){
      canMove = false;
      movePlayerDown();
      return;
    }

    if(index == 6 && canMove){
      canMove = false;
      movePlayerLeft();
      return;
    }

    if(index == 7 && canMove){
      canMove = false;
      movePlayerUp();
      return;
    }

    if (index == 3 && !hasWon) {
      hasWon = true;
      levelComplete();
      return;
    }

    function movePlayerRight(){
      player.setPosition(player.x + tileSize, player.y);
      setTimeout(function(){
        canMove = true;
      }, movementDelay);
    }

    function movePlayerDown(){
      player.setPosition(player.x, player.y + tileSize);
      setTimeout(function(){
        canMove = true;
      }, movementDelay);
    }

    function movePlayerLeft(){
      player.setPosition(player.x - tileSize, player.y);
      setTimeout(function(){
        canMove = true;
      }, movementDelay);
    }

    function movePlayerUp(){
      player.setPosition(player.x, player.y - tileSize);
      setTimeout(function(){
        canMove = true;
      }, movementDelay);
    }


    // if(index == 0 && canMove){
    //   player.setPosition(player.x + tileSize, player.y);
    //   // setTimeout(function(){
    //   //   getTile();
    //   // }, 200); 
    // }

    // // Check if the player is on top of a specific tile
    // if (tile && index === 3 && !hasWon) {
    //   hasWon = true;
    //   alert("Reached End of Level");
    // }

    // if (cursors.right.isDown && !buttonPressedRight) {
    //   //move player one tile to the right
    //   player.setPosition(player.x + tileSize, player.y);
    //   getTile();
  
    //   buttonPressedRight = true;
    // }

    // if (cursors.down.isDown && !buttonPressedDown) {
    //   //move player one tile to the down
    //   player.setPosition(player.x, player.y + tileSize);
    //   getTile();
  
    //   buttonPressedDown = true;
    // }

    // if (cursors.left.isDown && !buttonPressedLeft) {
    //   //move player one tile to the left
    //   player.setPosition(player.x - tileSize, player.y);
    //   getTile();
  
    //   buttonPressedLeft = true;
    // }

    // if (cursors.up.isDown && !buttonPressedUp) {
    //   //move player one tile to the left
    //   player.setPosition(player.x, player.y - tileSize);
    //   getTile();
  
    //   buttonPressedUp = true;
    // }

    // if (cursors.right.isUp) {
    //   // Reset the flag when the button is released
    //   buttonPressedRight = false;
    // }

    // if (cursors.down.isUp) {
    //   // Reset the flag when the button is released
    //   buttonPressedDown = false;
    // }

    // if (cursors.left.isUp) {
    //   // Reset the flag when the button is released
    //   buttonPressedLeft = false;
    // }

    // if (cursors.up.isUp) {
    //   // Reset the flag when the button is released
    //   buttonPressedUp = false;
    // }

    // getTile();
    // function getTile(){
    //   // Get the tile at the player's location
    //   let tile = map.getTileAtWorldXY(player.x, player.y);

    //   if(!tile){
    //     //reset player to start if the player is out of bounds
    //     player.setVelocityX(0);
    //     player.setVelocityY(0);
    //     player.setPosition(0, 0);

    //     return;
    //   }

    //   console.log(tile)
    //   console.log("tile: ",tile.index);

    //   let index = tile.index

    //   if(index == 1){
    //     player.setPosition(player.x + tileSize, player.y);
        
    //   }

    //   if(index == 0){
    //     player.setPosition(player.x + tileSize, player.y);
    //     setTimeout(function(){
    //       getTile();
    //     }, 200); 
        
    //   }

    //   // Check if the player is on top of a specific tile
    //   if (tile && index === 3 && !hasWon) {
    //     console.log(tile)
    //     hasWon = true;
    //     alert("Reached End of Level");
    //   }

    // }

  }

  document.getElementById("loading_gif_game").style.display = "none";
}

let playerReward = 45;
let level = "3-1";
let nextLevel = "level1-2.html";

const levelCompleteModal = new Modal(document.getElementById("levelCompleteModal"), {});

function levelComplete(){
  levelCompleteModal.toggle();
  rewardPlayer(playerReward, level);
}

document.getElementById("nextLevelButton").addEventListener("click", function(){
  location.href = nextLevel;
});

async function rewardPlayer(amount, level){
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      const uid = user.uid;
      const userRef = doc(db, "users", uid);

      const docSnap = await getDoc(userRef);
      const completedLevels1 = docSnap.data().completedLevels1;

      if (!completedLevels1.includes(level)){
        await updateDoc(userRef, {
          completedLevels1: arrayUnion(level),
          points: increment(amount)
        }).then(function(){
          document.getElementById("loading_gif").style.display = "none";
          document.getElementById("nextLevelButton").style.display = "block";
        });
      }else{
        console.log("level already completed");
        document.getElementById("loading_gif").style.display = "none";
        document.getElementById("nextLevelButton").style.display = "block";
      }
      
    } else {
      console.log("user not signed in");
    }
  });
}