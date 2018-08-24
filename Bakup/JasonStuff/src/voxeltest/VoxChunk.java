package voxeltest;

public class VoxChunk {
	byte[][][] StorChunk = new byte[16][16][16];
	boolean isair = true;
	public void Setisair(boolean b) {
		isair = b;
	}
	public VoxChunk(byte[][][] v) {
		StorChunk =v;
	}
	public void DeleteChunk() {
		StorChunk=null;
	}
}
