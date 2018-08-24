package game;

import java.awt.Point;

import javax.swing.ImageIcon;
import javax.swing.JLabel;
import dunemask.util.FileUtil;

public class Player {
	int x;
	int y;
	int vx = 0;
	int vy = 0;
	int detect;
	JLabel lab = new JLabel("Player");
	Board pan = null;
	KeyList key = new KeyList();
	public Player(Board pane,int xx, int yy) {
		x=xx;
		y=yy;
		pan = pane;
		lab.setSize(16,16);
		pan.add(lab);
		pan.setFocusable(true);
		pan.requestFocus();
		pan.addKeyListener(key);
		lab.setIcon(new ImageIcon(FileUtil.getResource("game/resources/player.png").getPath()));
	}

	public void update() {
		x+=vx;
		y+=vy;
		if(x<0)
			x=0;
		if(x>pan.getAllSquares().length*16-16)
			x=pan.getAllSquares().length*16-16;
		if(y<0)
			y=0;
		if(y>pan.getAllSquares()[0].length*16-16)
			y=pan.getAllSquares()[0].length*16-16;
		boolean og = false;
		//Square
		detect = 1;
		if(1==1) {
			if (DetectBlok(x+15,y+14)||DetectBlok(x+15,y+1)) {
				x-=vx;
				vx=0;
			}
			if (DetectBlok(x+1,y+14)||DetectBlok(x+1,y+1)) {
				x-=vx;
				vx=0;
			}
		if (DetectBlok(x+1,y+15)||DetectBlok(x+15,y+15)) {
			y-=vy;
			vy=0;
			og =true;
		}
		if (DetectBlok(x-0,y+0)||DetectBlok(x+15,y+0)) {
			y-=vy;
			vy=1;
		}
		}
		
		detect = 2;
		if(1==1) {
			if (DetectBlok(x+15,y+15)) {
				if((y+15-((y+15)/16)*16) > -1*(x+15-((x+15)/16)*16)+14) {
				if(vy>-1) {
					y-=vy;
					vy=0;
					og=true;
				}
				if(vx>1) {
					y-=vx+0;
					vy=-vx;
				}
				
				
				//System.out.println((y+14-((y+14)/16)*16)+">"+(-1*(x+14-((x+14)/16)*16)+16));
				}
			}
			if (DetectBlok(x+8,y+8)) {
				if(vy>-1) {
					y-=vy;
					vy=-5;
				}
			}
			
		}
		detect = 3;
		if(1==1) {
			if (DetectBlok(x,y+15)) {
				if((y+15-((y+15)/16)*16) > (x-((x)/16)*16)-1){
				if(vy>-1) {
					y-=vy;
					vy=0;
					og=true;
				}
				if(vx<-1) {
					y+=vx+0;
					vy=vx;
				}
				//System.out.println((y+14-((y+14)/16)*16)+">"+(-1*(x+14-((x+14)/16)*16)+16));
				}
			}
			if (DetectBlok(x+8,y+8)) {
				if(vy>-1) {
					y-=vy;
					vy=-5;
				}
			}
			
		}
		if (!og) {
			vy++;
		}else if (key.Output()[38]==1) {
			if (!(DetectBlok(x-0,y+0)||DetectBlok(x+15,y+0))) {
				vy = -15;
			}
		}
		if (key.Output()[37]==1) {
			vx += -5;
		}
		if (key.Output()[39]==1) {
			vx += 5;
		}
		vx = (vx * 60)/100;
		//System.out.println("X:" + x +" Y:" + y +" XV:" + vx +" YV:" + vy );
		if (vy>15) {vy=15;}
		lab.setLocation(x, y);
	}
	public boolean DetectBlok(int x,int y) {
		if (pan.getAllSquares()[(x/16)][((y)/16)] != null && Blok.getblock()[pan.getAllSquares()[(x/16)][((y)/16)].getType()] == detect) {
		return true;
		}else {
		return false;
		}
	}
}
