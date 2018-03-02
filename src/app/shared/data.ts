export interface Node {
  label: string,
  layer: number,
}

let rawNodes = {
  "output1":{
    "base_type":"output",
    "type":"dig",
    "dependants":[
      {
        "id":"middle1",
        "weight":0.5
      },
      {
        "id":"middle2",
        "weight":0.5
      }
    ]
  },
  "output2":{
    "base_type":"output",

    "type":"walkForward",

    "dependants":[
      {
        "id":"input5",
        "weight":1
      }
    ]
  },
  "middle1":{
    "base_type":"middle",
    "dependants":[
      {
        "id": "input1",
        "weight": 0.5
      },
      {
        "id": "input2",
        "weight": 0.5
      }
    ]
  },
  "middle2":{
    "base_type":"middle",
    "dependants":[
      {
        "id": "input3",
        "weight": 0.5
      },
      {
        "id": "input4",
        "weight": 0.5
      }
    ]
  },
  "input1":{
    "base_type":"input",
    "type":"hasInInventory",
    "target": {
      "type":"block",
      "block":26

    }
  },
  "input2":{
    "base_type":"input",
    "type":"canSeeBlock",
    "target":{
      "type":"block",
      "block":2
    }
  },
  "input3":{
    "base_type":"input",
    "type":"canSeeEntity",
    "target":{
      "type":"player"

    }
  },
  "input4":{
    "base_type":"input",
    "type":"canSeeEntity",
    "target":{
      "type":"object",
      "objectType":"rotten_flesh"

    }
  },
  "input5":{
    "base_type":"input",
    "type":"chat",
    "target": {
      "value": "walk"
    }

  },
  "input6":{
    "base_type":"input",
    "type":"chat",
    "target": {
      "value": "talk"
    }
  },
  "output3":{
    "base_type":"output",

    "type":"chat",

    "dependants":[
      {
        "id":"input6",
        "weight":1
      }
    ]
  },
  "input7":{
    "base_type":"input",
    "type":"chat",
    "target": {
      "value": "look"
    }
  },
  "output4":{
    "base_type":"output",

    "type":"lookAt",

    "dependants":[
      {
        "id":"input7",
        "weight":1
      }
    ]
  },
  "input8":{
    "base_type":"input",
    "type":"chat",
    "target": {
      "value": "come"
    }
  },
  "output5":{
    "base_type":"output",

    "type":"navigateTo",

    "dependants":[
      {
        "id":"input8",
        "weight":1
      }
    ]
  },







  "input10":{
    "base_type":"input",
    "type":"canSeeBlock",
    "target":{
      "type":"block",
      "block":56
    }
  },
  "input11":{
    "base_type":"input",
    "type":"hasInInventory",
    "target":{
      "type":"block",
      "block":17
    }
  },
  "output7":{
    "base_type":"output",

    "type":"equip",
    "destination":"hand",
    "dependants":[
      {
        "id":"input11"
      },
      {
        "id":"input10"
      }
    ]
  },





  "input12":{
    "base_type":"input",
    "type":"onCorrelateAttack",
    "target":{
      "type":"block",
      "block":17
    }
  },
  "output8":{
    "base_type":"output",

    "type":"attack",
    "dependants":[
      {
        "id":"input12"
      }
    ]
  }

};
let parsedNodes = [];
let links = [];
Object.keys(rawNodes).forEach((id)=>{
  rawNodes[id].id = id;
  parsedNodes.push(rawNodes[id]);
  if(!rawNodes[id].dependants){
    return;
  }
  rawNodes[id].dependants.forEach((dependant)=>{
    links.push({
      source: id,
      target: dependant.id,
      value: dependant.weight || (1/rawNodes[id].dependants)
    })
  })
})
export const Nodes: any = {
  nodes:parsedNodes,
  links: links
};
