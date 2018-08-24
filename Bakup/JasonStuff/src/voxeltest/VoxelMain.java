package voxeltest;

import java.awt.Cursor;
import java.awt.Point;
import java.awt.Toolkit;
import java.awt.event.MouseAdapter;
import java.awt.event.MouseEvent;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;

import javax.imageio.ImageIO;
import javax.swing.JFrame;

import Graphicstest.KeyList;
import Graphicstest.Vector3;

public class VoxelMain {
	public static VoxEn en3d = new VoxEn(new Vector3(10,10,50));
	public static boolean mousedown;
	public static boolean rmousedown;
	public static void main(String[] args) {
		BufferedImage cursorImg = new BufferedImage(16, 16, BufferedImage.TYPE_INT_ARGB);
		Cursor blankCursor = Toolkit.getDefaultToolkit().createCustomCursor(
			    cursorImg, new Point(0, 0), "blank cursor");
		Cursor normCursor = Cursor.getDefaultCursor();
		
		
		
		JFrame frame = new JFrame("VoxPan");
		VoxPanel p = new VoxPanel();
		p.SetE3d(en3d);
		frame.getContentPane().add(p);
	    frame.setSize(400, 400);
	    frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
	    frame.setVisible(true);
	    KeyList key = new KeyList();
	    frame.addKeyListener(key);
	    frame.setFocusable(true);
	    frame.requestFocus();
	    frame.repaint();
	    frame.getContentPane().setCursor(blankCursor);
	    frame.addMouseListener(new MouseAdapter() {
	    	public void mousePressed(MouseEvent e) {
	    		if(e.getButton()==1)
	    		mousedown = true;
	    		if(e.getButton()==3)
		    		rmousedown = true;
	    		
	    	}
	    	public void mouseReleased(MouseEvent e) {
	    		if(e.getButton()==1)
		    		mousedown = false;
		    		if(e.getButton()==3)
			    		rmousedown = false;
	    	}
	    });
	    int time = 0;
	    int escape = 0;
	    while(true) {
	    try {
			Thread.sleep(100);
		} catch (InterruptedException e1) {
			e1.printStackTrace();
		}
	    frame.getContentPane().setCursor(blankCursor);
	    en3d.SetMouse(frame.getLocation().x+(int)frame.getSize().getWidth()/2, frame.getLocation().y+(int)frame.getSize().getHeight()/2);
	    while(escape==0) {
	    	time++;
	    	en3d.MouseCam();
	    	try {
				Thread.sleep(30);
			} catch (InterruptedException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
	    	
	    	en3d.RotateCam(0.000f, 0.000f);
	    	
	    	if(key.Output()[39]==1) {
	    		en3d.RotateCam(0.05f, 0);
	    	}
	    	
	    	if(key.Output()[38]==1) {
	    		en3d.RotateCam(0, 0.05f);

	    	}
	    	if(key.Output()[37]==1) {
	    		en3d.RotateCam(-0.05f, 0);

	    	}
	    	if(key.Output()[40]==1) {
	    		en3d.RotateCam(0, -0.05f);

	    	}
	    	if(key.Output()[87]==1) {
	    		en3d.MoveCam(Vector3.foreward(0.1f).rotate(en3d.rx, "z"));
	    	}
	    	if(key.Output()[83]==1) {
	    		en3d.MoveCam(Vector3.backward(0.1f).rotate(en3d.rx, "z"));
	    	}
	    	if(key.Output()[68]==1) {
	    		en3d.MoveCam(Vector3.rightward(0.1f).rotate(en3d.rx, "z"));
	    	}
	    	if(key.Output()[65]==1) {
	    		en3d.MoveCam(Vector3.leftward(0.1f).rotate(en3d.rx, "z"));
	    	}
	    	if(key.Output()[32]==1) {
	    		en3d.MoveCam(Vector3.upward(0.1f));
	    	}
	    	if(key.Output()[16]==1) {
	    		en3d.MoveCam(Vector3.downward(0.1f));
	    	}
	    	//Escape
	    	if(key.Output()[27]==1) {
	    		escape=1;
	    	}
	    	frame.repaint();
	    	if (time%3==0) {
	    		//System.out.println("X:"+(int)en3d.campos.x+" Y:"+(int)en3d.campos.y+" Z:"+(int)en3d.campos.z);
	    		en3d.campos.print();
	    		//System.out.println(mousedown);
	    		
	    	}
	    	if (mousedown) {
	    		en3d.setBlock(0);
	    	}
	    	if (rmousedown) {
	    		en3d.setBlockOut(1);
	    	}
	    }
	    frame.getContentPane().setCursor(normCursor);
	    while(key.Output()[27]==1) {
	    }
	    while(escape==1) {
	    	try {
				Thread.sleep(100);
			} catch (InterruptedException e1) {
				// TODO Auto-generated catch block
				e1.printStackTrace();
			}
	    	if(key.Output()[27]==1) {
	    		escape=0;
	    	}
	    }
	    }
	}

}
