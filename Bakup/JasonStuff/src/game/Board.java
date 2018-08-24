package game;

import java.awt.Color;
import java.awt.Point;
import java.awt.event.MouseEvent;
import java.awt.event.MouseListener;

import javax.swing.ImageIcon;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JPanel;
import javax.swing.event.MouseInputAdapter;

import game.Blok;

public class Board extends JPanel{
	static Blok[][] AllSquares;
	int mousx;
	int mousy;
	static ImageIcon[] images=null;
	public Board(JFrame f,JLabel num, ImageIcon[] image){
		images = image;
		this.setLayout(null);
		this.setBackground(new Color(20,240,250));
		this.setSize(1024,512);
		this.setLocation(0, 0);
		AllSquares = new Blok[64][32];
		for(int i=30;i<32;i++) {
			for (int j=0;j<32;j++) {
				AllSquares[j][i] = Addsquare(j,i,this,1);
			}
		}
		
		this.addMouseListener(new MouseListener() {
	        public void mousePressed(MouseEvent me) { }
	        public void mouseReleased(MouseEvent me) { }
	        public void mouseEntered(MouseEvent me) { }
	        public void mouseExited(MouseEvent me) { }
	        public void mouseClicked(MouseEvent me) { 
	        	//AllSquares[me.getX()/16][me.getY()/16] = Addsquare(me.getX()/16,me.getY()/16,p);
	        	//System.out.println(me.getX());
	        }
	    });
		JPanel p=this;
		this.addMouseMotionListener(new MouseInputAdapter() {
			public void mouseMoved(MouseEvent me){
				//System.out.println(me.getX());
				mousx=(me.getX()/16)*16;
				mousy=(me.getY()/16)*16;
			}
			public void mouseDragged(MouseEvent me) {
				int c = Integer.parseInt(num.getText())-1;
				if(me.getY()<p.getHeight()&&me.getX()<p.getWidth()&&me.getX()>0&&me.getY()>0) {
					SetBlok(me.getX()/16,me.getY()/16,p,c);
				}
				//System.out.println(me.getX());
				f.repaint();
				mousx=(me.getX()/16)*16;
				mousy=(me.getY()/16)*16;
			}
		});
		
		
	}
	public Blok[][] getAllSquares() {
		return AllSquares;
	}
	public void setAllSquares(Blok[][] allSquares) {
		AllSquares = allSquares;
	}
	public static void SetBlok(int x, int y, JPanel j, int c) {
		if (c==-1) {	
			if(AllSquares[x][y]!=null) {
			j.remove(AllSquares[x][y]);
			AllSquares[x][y] = null;
			}
			//p.remove(AllSquares[me.getX()/16][me.getY()/16]);
		} else {
			if(AllSquares[x][y]==null) {
				AllSquares[x][y] = Addsquare(x,y,j,c);
			} else {
				AllSquares[x][y].setImage(images[c]);
				AllSquares[x][y].setType(c);
			}
		}
	}
	public static Blok Addsquare(int x, int y,JPanel p,int choose){
		Blok b = new Blok(choose,x,y,images[choose]);
		p.add(b);
		return b;
	}
	public Point getMouse() {
		Point po = new Point();
		po.setLocation(mousx, mousy);
		return po;
	}
}
