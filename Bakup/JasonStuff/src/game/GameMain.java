package game;

import java.awt.Color;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.io.File;

import javax.swing.ImageIcon;
import javax.swing.JButton;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JPanel;
import javax.swing.JTextField;
import javax.swing.Timer;

import dunemask.util.FileUtil;

public class GameMain {
	//Use dunemask.fileutil.getresource it will ignore the bin and will also work in jar form
	//static ImageIcon image1 = new ImageIcon("bin/game/imgs/blok1.png");
	static int lengthf = new File("bin/game/imgs").listFiles().length;
	public static ImageIcon images[] = new ImageIcon[lengthf];
	//static ImageIcon image1 = new ImageIcon(FileUtil.getResource("game/imgs/blok"+(i+1)+".png").getPath());
	public static void main(String[] args) {
		//Get images
		for(int i = 0 ; i<lengthf;i++) {
			images[i] = new ImageIcon(FileUtil.getResource("game/imgs/blok"+(i+1)+".png").getPath());
		}
		int choose = 1;
		JFrame f = new JFrame();
		JLabel num = new JLabel("STUFF");
		num.setSize(100,100);
		num.setLocation(10,10);
		JPanel tab1 = new JPanel();
		tab1.setLayout(null);
		tab1.setBackground(new Color(200,200,200));
		tab1.setSize(1024,256);
		tab1.setLocation(0,768);
		num.setText("1");
		
		
		//Buttons
		TButon[] labs = new TButon[lengthf];
		for (int i=0; i<lengthf;i++) {
		labs[i] = new TButon(i+1,num);
		//labs[i].setText("blo "+ i);
		labs[i].setIcon(images[i]);
		labs[i].setSize(50,50);
		labs[i].setLocation(i*50+50, 10);
		tab1.add(labs[i]);
		}
		
		//Eraser
		TButon erase = new TButon(0,num);
		erase.setSize(50,50);
		erase.setLocation(0,10);
		tab1.add(erase);
		
		JTextField jtf = new JTextField();
		JButton save = new JButton();
		save.setLocation(64, 64);
		save.setText("Save");
		save.setSize(64,32);
		save.setLayout(null);
		save.addActionListener(new ActionListener() {
			@Override
			public void actionPerformed(ActionEvent arg0) {
				
			}
		});
		
		jtf.setLocation(64, 128);
		jtf.setSize(128,32);
		
		
		f.setTitle("GAME MAIN");
		f.setSize(1024,1024);
		f.setResizable(true);
		f.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		f.setVisible(true);
		f.setLocationRelativeTo(null);
		f.setLayout(null);
		f.add(tab1);
		f.add(save);
		f.add(jtf);
		Board p = new Board(f,num,images);
		Player play = new Player(p,32,32);
		
		JPanel play1=new JPanel();
		play1.setSize(512,512);
		play1.setLayout(null);
		play1.setLocation(256, 256);
		play1.add(p);
		f.add(play1);
		f.add(num);
		f.repaint();
		f.repaint();
		JLabel sel = new JLabel(images[Integer.parseInt(num.getText())]);
		sel.setSize(16,16);
		p.add(sel);
		
		try {
			Thread.sleep(100);
		} catch (InterruptedException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		Timer timer = new Timer(25,new ActionListener() {
			@Override
			public void actionPerformed(ActionEvent arg0) {
				play.update();
				int camx=play.x;
				int camy=play.y;
				camx= (camx+play.x)/2;
				camy= (camy+play.y)/2;
				if (camy>128) {
					camy=128;
				}
				p.setLocation(-camx+128, -camy+128);
				
			}
		});
		timer.start();
		
		JButton start = new JButton();
		start.setLocation(32, 512);
		start.setText("Start");
		start.setSize(64,32);
		start.setLayout(null);
		start.addActionListener(new ActionListener() {
			@Override
			public void actionPerformed(ActionEvent arg0) {
				p.requestFocus();
			}
			
		});
		f.add(start);
		
		
		
		while (1==1) {
			int ca= Integer.parseInt(num.getText())-1;
			if (ca>=0) {
			sel.setIcon(images[ca]);
			//play.update();
			}else {
			sel.setIcon(null);
			}
			sel.setLocation(p.getMouse());
			//p.requestFocus();
		}
	}
}