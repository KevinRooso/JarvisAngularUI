import { NestedTreeControl } from '@angular/cdk/tree';
import { Component, ChangeDetectorRef, Input, OnInit, OnChanges } from '@angular/core';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { BehaviorSubject } from 'rxjs';



/**
 * Node for game
 */
export class GameNode {
  children: BehaviorSubject<GameNode[]>;
  constructor(public item: string,
    public icon:string, children?: GameNode[], public parent?: GameNode) {
    this.children = new BehaviorSubject(children === undefined ? [] : children);
  }
}

/**
 * The list of games
 */
const TREE_DATA_G = [

 /*  new GameNode('Indie', 'link', [
    new GameNode(`Don't Starve` ,'link', [
      new GameNode(`Region of Giants`,'settings_input_hdmi'),
      new GameNode(`Together`,'bookmark'),
      new GameNode(`Shipwrecked`,'bookmark')
    ]),

  ]), */
  new GameNode('Bounce_v4.75-123456789','memory', [
    new GameNode(`FSL-LT-70-HE316153#123456789`,'memory'),
    new GameNode(`TCU-LT-70-HE316153#123456789`,'memory'),
    new GameNode(`BMS-LT-70-HE316153#123456789`,'memory')
  ])

];

@Component({
  selector: 'app-sub-component-tree',
  templateUrl: './sub-component-tree.component.html',
  styleUrls: ['./sub-component-tree.component.scss']
})
export class SubComponentTreeComponent implements OnChanges{

  recursive: boolean = true;
  levels = new Map<GameNode, number>();
  treeControl: NestedTreeControl<GameNode>;
  isData = false;

  @Input() treeData = null;

  sampleTreeData: any = {
    "parent":"BounceTempv1",
    "children": {
      child1: "child1",
      child2: "child2",
      child3: "child3"
    }
  };



  dataSource: MatTreeNestedDataSource<GameNode>;

  constructor(private changeDetectorRef: ChangeDetectorRef) {

    this.treeControl = new NestedTreeControl<GameNode>(this.getChildren);
    this.dataSource = new MatTreeNestedDataSource();
    this.dataSource.data = TREE_DATA_G;
  }

  ngOnChanges(){   
    console.log(this.treeData);
    if(this.treeData !== null){
      this.isData = true;
    }else{
      this.isData = false;      
    }
  }

  getChildren = (node: GameNode) => {
    return node.children;
  };

  hasChildren = (index: number, node: GameNode) => {
    return node.children.value.length > 0;
  }


}
