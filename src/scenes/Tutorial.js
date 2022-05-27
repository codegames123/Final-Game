class Tutorial extends Phaser.Scene {
    constructor() {
        super("tutorialScene");
    }
    create(){
        this.add.text(game.config.width/2 - 230, game.config.height/2 - 260, "HOW TO PLAY", {fontFamily: 'Segoe Script', fontSize: 60});
            //this.scale.setGameSize(640, 480);
           //attempt 2: 2 strings, an empty and a full. after certain time add letter to empty from full and print
           let txtTime = 60; //set timer duration

           //28 chars allowed per line
           let testStr = 'As the bearer of this task, it is your job to collect the disks within the map. However, you must watch out for the enemies: The Muted Ones. Sometimes they\'ll hit you, sometimes they\'ll shoot. Make sure they don\'t steal the disks from you! Use WAD to move up, left, and right. Use the Space Bar to jump. When you collect all of the disks, you win the level.@Good luck.@We believe in you.'; //create test string
           console.log(testStr.length);
           let spaceStr = "                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           ";
           /*let testArr = []; //arrays for text and spaces
           let spaceArr = [];
           for(let i = 0; i<testStr.length; i++) { //parse chars to arr
               testArr.push(testStr.charAt(i));
           }
           for(let i = 0; i<spaceStr.length; i++) {
               spaceArr.push(spaceStr.charAt(i));
           }*/
           keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F); // for menu
           let linePos = 0; //position on current line
           let newLine = false;
           let text2Print = ''; //text to print
           let leftOffset = 20; //amount current parts of string offset
           let downOffset = 120; //y position of current line
           let repeatTimes = 0; //times repeated
           let spcRptTimes = 0; //above for space
           this.textConfig = {
               fontFamily: 'Courier',
               fontSize: '24px',
               backgroundColor: '#000000',
               color: '#FFFFFF',
               align: 'center',
               padding: {
                   top: 5, 
                   bottom: 5
               }
           }
           let newLineConfig = {
               fontFamily: 'Courier',
               fontSize: '24px',
               backgroundColor: '#000000',
               color: '#000000',
               align: 'center',
               padding: {
                   top: 5, 
                   bottom: 5
               }
           }                
               this.timer = this.time.addEvent({
                   delay: txtTime,                // ms
                   callback: () => {
                       leftOffset+=(20);
                       if(leftOffset > game.config.width-21) { //breaking right bounds
                           if(testStr.charAt(repeatTimes) != ' ')
                           {
                               leftOffset = 40;
                           }
                           else {
                               leftOffset = 20;
                           }
                           linePos = 0;
                           downOffset +=40;
                       }
                       //issue: adds the last letter of the word breaking bounds at the very lower right corner down too much.
                      if(leftOffset == game.config.width - 40 && testStr.charAt(repeatTimes) != ' ' && repeatTimes!=testStr.length) {
                           //if at rightmost letter and the word incomplete
                           let rightBTestNum = 0; //numbers to use to make sure words fit\
                           //fix this while: it is making an infinite loop
                           while(testStr.charAt(repeatTimes - rightBTestNum) != ' ') {
                               rightBTestNum ++;
                           }
                           for(let i = 0; i<rightBTestNum-1; i++) {
                               //replace problematic letters on current row w spaces
                               leftOffset-=20;
                               this.add.text(leftOffset, downOffset, ' ', this.textConfig);
                           }
                           //go to new row
                           linePos=0;
                           leftOffset = 20;
                           downOffset+=40;
                           if(downOffset > game.config.height / 2 + 160) { //breaking down bounds
                               this.cameras.main.setBackgroundColor("#000000");
                               leftOffset = 20;
                               downOffset = 120;
                               linePos=0;
                           }

                           //reprint those letters on the next row and add RBTN to repeattimes
                           for(let i = 0; i<rightBTestNum+1; i++) {
                               this.add.text(leftOffset, downOffset, testStr.charAt(repeatTimes+rightBTestNum - i), this.textConfig);
                           }
                           repeatTimes-=rightBTestNum;
                       }
                       if(downOffset > game.config.height / 2 + 160) { //breaking down bounds
                           this.cameras.main.setBackgroundColor("#000000");
                           //this checks out
                           if(testStr.charAt(repeatTimes) != ' ')
                           {
                               leftOffset = 40;
                           }
                           else {
                               leftOffset = 20;
                           }
                           downOffset = 120;
                           linePos=0;
                       }
                       if(repeatTimes == testStr.length+2)
                       {
                           repeatTimes+=rightBTestNum;
                       }
                       //if character is @ then new line
                       if(testStr.charAt(repeatTimes) == '@') {
                           newLine = true;
                       }
                       if(!testStr.charAt(repeatTimes) && spcRptTimes<spaceStr.length && newLine == false) {
                           text2Print = spaceStr.charAt(spcRptTimes);
                           this.add.text(leftOffset,downOffset, text2Print, this.textConfig);
                           spcRptTimes ++;
                       }
                       else if(testStr.charAt(repeatTimes) && spcRptTimes<spaceStr.length && newLine == false) {
                           text2Print = testStr.charAt(repeatTimes);
                           this.add.text(leftOffset,downOffset, text2Print, this.textConfig);
                           repeatTimes ++;
                           linePos++;
                       }
                       else if(newLine == true) {
                           for(let i = 0; i<(45-linePos); i++)
                           {
                               this.add.text(leftOffset, downOffset, ' ', this.textConfig);
                               leftOffset+=20;
                           }
                           repeatTimes++;
                           leftOffset = 20;
                           downOffset+=40;
                           newLine = false;
                           linePos=0;
                       }
                       },
                   callbackScope: this,
                   repeat: testStr.length+spaceStr.length+1
               });
               //in callback: if downOffset > (amount) then 1. clear screen 2. depend on if ' ', leftoffset = 40 or 20 and downoffset = 20;
               //timer 2: fill screen with spaces
               leftOffset = 20;
               downOffset = 120;  
        //click back to go back to menu
        const clickBack = this.add.text(game.config.width / 2 + 300, game.config.height / 2 + 200, 'Back', { fontFamily: 'Segoe Script', fontSize: 60, color: 'orange' }).setInteractive()
            .on('pointerdown', () =>  {
                this.selectSound = this.sound.add('selectSound', { loop: false });
                this.selectSound.play();
                this.scene.start('menuScene');})
            .on('pointerover', () => {
                clickBack.setStyle({fill: 'green'});
            })
            .on('pointerout', () => {
                clickBack.setStyle({fill: 'orange'})
            });
    }
}