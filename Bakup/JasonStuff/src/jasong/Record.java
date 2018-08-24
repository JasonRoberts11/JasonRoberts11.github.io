package jasong;

import java.awt.Color;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;
import java.util.ArrayList;

import javax.sound.sampled.AudioFileFormat;
import javax.sound.sampled.AudioFormat;
import javax.sound.sampled.AudioInputStream;
import javax.sound.sampled.AudioSystem;
import javax.sound.sampled.DataLine;
import javax.sound.sampled.LineUnavailableException;
import javax.sound.sampled.TargetDataLine;
import javax.sound.sampled.UnsupportedAudioFileException;
import javax.swing.JFileChooser;
import javax.swing.JFrame;
import javax.swing.JPanel;

public class Record {
	static boolean stopped = false;
	public static void main(String[] args) {
		JFrame f = new JFrame();
		f.setTitle("Music");
		f.setSize(650,650);
		f.setResizable(true);
		f.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		f.setVisible(true);
		f.setLocationRelativeTo(null);
		JPanel[] jplist = new JPanel[600];
		for(int i=0;i<jplist.length;i++) {
			JPanel jip = new JPanel();
			jip.setLayout(null);
			jip.setBackground(new Color((i*5)%256,(i*5+85)%256,(i*5+2*85)%256));
			jplist[i]=jip;
			f.add(jip);
		}
		f.repaint();
		File fli = null;
		final JFileChooser fc = new JFileChooser("Players\\");
		int returnVal = fc.showOpenDialog(null);
		
		if(returnVal == JFileChooser.APPROVE_OPTION) {
			File fload = fc.getSelectedFile();
			fli = fload;
		}
		TargetDataLine line;
		AudioInputStream fileStream;
		AudioFormat auf = null;
		try {
			fileStream = AudioSystem.getAudioInputStream(fli);
			auf = fileStream.getFormat();
		} catch (UnsupportedAudioFileException e1) {
			e1.printStackTrace();
		} catch (IOException e1) {
			e1.printStackTrace();
		}
		DataLine.Info info = new DataLine.Info(TargetDataLine.class, auf);
		if (!AudioSystem.isLineSupported(info)) {
		}
		try {
			line  = (TargetDataLine) AudioSystem.getLine(info);
			line.open(auf);
			
			ByteArrayOutputStream out = new ByteArrayOutputStream();
			
			int numBytesRead;
			byte[] data = new byte[line.getBufferSize()/5];
			System.out.println("dudes");
			line.start();
			while (!stopped ) {
				numBytesRead = line.read(data, 0, data.length);
				if (0 == 0) {
					//jpnl.setBounds(100, 300-height,5,2*height);
					for(int i=0; i< jplist.length;i++) {
						int height = Math.abs(data[(data.length-i*6)-1]);
						jplist[i].setBounds(i*1, 300-height, 1, 2*height);
					}
				}
			}
		}catch(LineUnavailableException e) {
		}
	}
}
