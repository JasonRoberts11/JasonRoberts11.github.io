package Graphicstest;

import java.util.Random;

import javax.swing.JFrame;

public class TestMain {
	Random rand = new Random();
    public static Environment3D en3d = new Environment3D(new Vector3(0,0,0),0,0);
	public static void main(String[] args) {
		JFrame frame = new JFrame("ColorPan");
		Panel3D p = new Panel3D();
		p.SetE3d(en3d);
		//for(int i = 0; i <3; i++) {
		//en3d.AddFace(Vector3.rand(100),Vector3.rand(100), Vector3.rand(100));
		//en3d.AddFace(new Vector3(-10,-10,-10),new Vector3(-10,10,-10), new Vector3(10,-10,-10),0);
		//en3d.AddFace(new Vector3(-10,-10,-10),new Vector3(-10,-10,10), new Vector3(-10,10,-10),0);
		en3d.AddFace(new Vector3(-100,-100,-10),new Vector3(100,-100,-10), new Vector3(-100,100,-10),0);
		//en3d.AddFace(new Vector3(-10,0,-1000),new Vector3(10,-10,-1002), new Vector3(10,10,-1001));
		//}
		for(int i = 0; i <3; i++) {
			en3d.AddCube(0, 0, i*30, 10-i*2.5f, 1);
		}
	    frame.getContentPane().add(p);
	    frame.setSize(600, 600);
	    frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
	    frame.setVisible(true);
	    KeyList key = new KeyList();
	    frame.addKeyListener(key);
	    frame.setFocusable(true);
	    frame.requestFocus();
	    int time = 0;
	    while(true) {
	    	time++;
	    	
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
	    		en3d.MoveCam(Vector3.foreward(1).rotate(en3d.rx, "z"));
	    	}
	    	if(key.Output()[83]==1) {
	    		en3d.MoveCam(Vector3.backward(1).rotate(en3d.rx, "z"));
	    	}
	    	if(key.Output()[68]==1) {
	    		en3d.MoveCam(Vector3.rightward(1).rotate(en3d.rx, "z"));
	    	}
	    	if(key.Output()[65]==1) {
	    		en3d.MoveCam(Vector3.leftward(1).rotate(en3d.rx, "z"));
	    	}
	    	if(key.Output()[32]==1) {
	    		en3d.MoveCam(Vector3.upward(1));
	    	}
	    	if(key.Output()[16]==1) {
	    		en3d.MoveCam(Vector3.downward(1));
	    	}
	    	frame.repaint();
	    	if (time%3==0) {
	    		//en3d.ClearFaces();
	    		//for(int i = 0; i <3; i++) {
	    			//en3d.AddFace(Vector3.rand(100),Vector3.rand(100), Vector3.rand(100));
	    			//}
	    		System.out.println("X:"+(int)en3d.campos.x+" Y:"+(int)en3d.campos.y+" Z:"+(int)en3d.campos.z);
	    	}
	    }
	}
	public float rn(float low, float high) {
		return (float)Math.random()*(high-low)+low;
	}
}
