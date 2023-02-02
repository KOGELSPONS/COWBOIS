function collision(x1,y1,w1,h1, x2,y2,w2,h2){
    if (x1 < x2 + w2 &&
    x1 + w1 > x2 &&
    y1 < y2 + h2 &&
    h1 + y1 > y2) {
    return true;
  }
}

