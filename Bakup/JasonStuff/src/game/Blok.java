package game;

import javax.swing.ImageIcon;
import javax.swing.JLabel;
import javax.swing.JPanel;

public class Blok extends JPanel {
	int type = 0;
	ImageIcon image;
	JLabel lab=(null);
	public Blok(int typ,int x, int y,ImageIcon img) {
		type = typ;
		image = img;
		this.setSize(16, 16);
		this.setLocation(x*16, y*16);
		this.setLayout(null);
		this.setBackground(null);
		lab =  new JLabel(image);
		lab.setSize(16,16);
		lab.setLocation(0, 0);
		this.add(lab);
	}
	public int getType() {
		return type;
	}
	public ImageIcon getImage() {
		return image;
	}
	public JLabel getLab() {
		return lab;
	}
	public void setType(int type) {
		this.type = type;
	}
	public void setImage(ImageIcon image) {
		this.image = image;
		lab.setIcon(image);
	}
	public void setLab(JLabel lab) {
		this.lab = lab;
	}
	public static int[] getblock() {
		int[] i = {1,1,1,0,2,3,4};
		return i;
	}
}
