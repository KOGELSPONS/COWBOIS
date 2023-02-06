function collision(x1,y1,w1,h1, x2,y2,w2,h2){
    if (x1 < x2 + w2 &&
    x1 + w1 > x2 &&
    y1 < y2 + h2 &&
    h1 + y1 > y2) {
    return true;
  }
}

function checkCollision(){   

  colliding = false;

  // check collision for each item
  items.forEach(function(item) {
        
      // calculate difference from x and y axis centres
      let dx = (player.x + player.halfWidth) - (item.x + 25);
      let dy = (player.y + player.halfHeight) - (item.y + 25);
  
      let combinedHalfWidths  = player.halfWidth + 25;
      let combinedHalfHeights = player.halfHeight + 25;
  
      // x-axis collision?
      if(Math.abs(dx) < combinedHalfWidths){
        
        // y-axis collision?
        if(Math.abs(dy) < combinedHalfHeights){          
  
          let overlapX = combinedHalfWidths - Math.abs(dx);
          let overlapY = combinedHalfHeights - Math.abs(dy);          
  
          // collision is on the smallest overlap
          if(overlapX >= overlapY){
            if(dy > 0) {
              overlapYUpdt = overlapY;
              colliding = "top";
            }
            else {            
              overlapYUpdt = overlapY;
              colliding = "bottom";
            }
          }
          else{
            if(dx > 0){ 
              overlapXUpdt = overlapX; 
              colliding = "left";
            }
            else {
              overlapXUpdt = overlapX;
              colliding = "right";
            }
          }
        }
      }
  });
  
  return colliding;
}