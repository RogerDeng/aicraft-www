import { Component, OnInit } from '@angular/core';

import { SocketService } from '../socket.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  selected: any[] = [];
  public rows = [];
  public loadingIndicator: boolean = true;
  public reorderable: boolean = true;
  public servers:string = null;
  public promptReset:boolean = false;

  public columns = [
    { prop: 'name' },
    { name: 'generation' },
    { name: 'username' },
    { name: 'alive' },
    {
      name: 'lastAction'
    }
  ];

  constructor(
    private socket:SocketService
  ) {

  }
  ngOnInit() {
    this.fetch((data) => {
      this.rows = data;
      setTimeout(() => { this.loadingIndicator = false; }, 1500);
    });

    this.socket.on('client_hello', (bot)=>{
      bot.updated = Date.now().toString();
      let botExists = false;
      this.rows.forEach((row, index)=>{
        if(!this.rows){
          return;
        }
        if(this.rows[index].username != bot.username){
          return
        }
        botExists = true;
        this.rows[index] = bot;
      })
      if(!botExists) {
        this.rows.push(bot);
      }
      this.rows = [...this.rows];
    })


    this.socket.on(SocketService.client_fire_outputnode, (payload)=> {
      console.log(SocketService.client_fire_outputnode, payload)
      this.rows.forEach((row)=>{
        if(row.username != payload.username){
          return;
        }
        row.lastAction = payload.payload.type;
        row.updated = Date.now().toString();
        this.rows = [...this.rows];
        setTimeout(((row)=>{
          row.lastAction = null;
          row.updated = Date.now().toString();
        })(row), 5000);

      })
    });
  }

  public showServers() {
    const req = new XMLHttpRequest();
    req.open('GET', `http://localhost:3000/servers`);//`http://chaoscraft-api.schematical.com/bots`);

    req.onload = () => {
      this.servers = /*JSON.parse*/(req.response);
    };

    req.send();
  }
  public fetch(cb) {
    const req = new XMLHttpRequest();
    req.open('GET', `http://localhost:3000/bots/active`);//`http://chaoscraft-api.schematical.com/bots/active`);

    req.onload = () => {
      cb(JSON.parse(req.response));
    };

    req.send();
  }

  public reset($event){
    $event.preventDefault();
    const req = new XMLHttpRequest();
    req.open('POST', 'http://localhost:3000/reset');//`http://chaoscraft-api.schematical.com/reset`);

    req.onload = () => {
      this.promptReset = false;
    };
    req.setRequestHeader("Content-Type", "application/json");
    req.send(JSON.stringify({}));
    //req.send();
  }


  onActivate(e){
    console.log("onActivate",e);
    window.location.href = '/bots/' + e.row.username;
  }
  onSelect(event) {
    console.log('Event: select', event, this.selected);
  }
  requestPing(){
    console.log("Sending Ping");
    this.socket.emit('www_ping', {
      timestamp: new Date().getTime()
    });

  }


}
