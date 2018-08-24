package main;

import java.awt.Color;
import java.awt.GraphicsConfiguration;
import java.awt.HeadlessException;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.WindowAdapter;
import java.awt.event.WindowEvent;
import java.awt.event.WindowListener;

import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JPanel;
import javax.swing.Timer;
import java.awt.color.*;
import java.awt.Font;
public class BasicFrame extends JFrame {
	int tx;
	int ty;
	int num=0;
	Popup ppup;
	JPanel jil;
	public BasicFrame(int x, int y, Popup p) throws HeadlessException {
		ppup = p;
		tx = x;
		ty = y;
		this.setTitle("Basic Frame");
		this.setSize(500,500);
		this.setResizable(false);
		this.setDefaultCloseOperation(JFrame.DO_NOTHING_ON_CLOSE);
		this.setVisible(true);
		this.setLocationRelativeTo(null);
		this.setLocation(tx, ty);
		jil = new JPanel();
		jil.setLayout(null);
		JLabel k = new JLabel("!!!YOU WON A FREE CAR!!!");
		k.setFont(new Font("Tahoma", Font.PLAIN, 40));
		k.setBounds(0, 0, 500, 500);
		k.setHorizontalAlignment(0);
		jil.add(k);
		getContentPane().add(jil);
		repaint();
		revalidate();
		this.addWindowListener(new WindowAdapter() {
			public void windowClosing(WindowEvent e) {
				ppup.CreateBF(tx+20, ty-20);
			}
		});
		Timer timer = new Timer(10,new ActionListener() {
			@Override
			public void actionPerformed(ActionEvent arg0) {
				num+=10;
				jil.setBackground(new Color(255-(num%256),num %256,1));
			}
		});
		timer.start();
	}
}
