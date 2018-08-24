package Graphicstest;

import java.awt.Graphics;
import java.awt.image.BufferedImage;

import javax.swing.JComponent;

public class Panel3D extends JComponent {
	public Environment3D e3d = null;
	public int res = 4;
	public void paint(Graphics g) {
		 int width = getSize().width/res;
		    int height = getSize().height/res;
		    int[] data = new int[width * height];
		    int i = 0;
		    for (int y = 0; y < height; y++) {
		      //int red = (y * 255) / (height - 1);
		      for (int x = 0; x < width; x++) {
		        //int green = (x * 255) / (width - 1);
		        //int blue = 0;
		        //blue+=Graphicstest.TestMain.rx;
		        data[i++] = e3d.GetPix(x-width/2, y-height/2);
		      }
		    }
		    BufferedImage image = new BufferedImage(width, height, BufferedImage.TYPE_INT_RGB);
		    image.setRGB(0, 0, width, height, data, 0, width);
		    g.drawImage(image, 0, 0, width*res, height*res, this);
		    System.out.println("DONE");
	}
	public void SetE3d(Environment3D edd) {
		e3d=edd;
	}

}
