package jasong;

import java.io.File;
import java.io.IOException;

import javax.sound.sampled.AudioInputStream;
import javax.sound.sampled.AudioSystem;
import javax.sound.sampled.Clip;
import javax.sound.sampled.LineUnavailableException;
import javax.sound.sampled.UnsupportedAudioFileException;
import javax.swing.JFileChooser;
public class MusicTest {
	File filesong;
	public static void main(String[] args) {
		// TODO Auto-generated method stub
		final JFileChooser fc = new JFileChooser("Players\\");

		File fe = new File("Players");
		fc.setCurrentDirectory(fe);
		int returnVal = fc.showOpenDialog(null);
		if(returnVal == JFileChooser.APPROVE_OPTION) {
			File fload = fc.getSelectedFile();
			PlaySong(fload);
		}
	}
	public static void PlaySong(File song) {
		AudioInputStream ais = null;
		try {
		ais = AudioSystem.getAudioInputStream(song.getAbsoluteFile());
		} catch(UnsupportedAudioFileException | IOException e1){
			
		}
		Clip c = null;
		try {
			c = AudioSystem.getClip();
		} catch (LineUnavailableException e) {
			e.printStackTrace();
		}
			try {
				c.open(ais);
			} catch (LineUnavailableException | IOException e) {
				e.printStackTrace();
			}

		c.start();
		try {
			Thread.sleep(c.getMicrosecondLength());
		} catch (InterruptedException e) {
			e.printStackTrace();
		}
	}
}
