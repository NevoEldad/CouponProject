import java.util.ArrayList;

public class Main {

	public static void main(String[] args) {
		// int[] arr1 = new int[] { 1, 12, 42, 70, 36, -4, 43, 15 };
		// int[] arr2 = new int[] { 5, 15, 44, 72, 36, 2, 69, 24 };
		int[] arr1 = new int[] { -1, -2, 3, -5 };
		int[] arr2 = new int[] { 5, 4, 6, 7 };
		mergeSort(arr1, arr2);
		System.out.println(solution(arr1, arr2));
	}

	public static int solution(int[] A, int[] B) {
		int j = 0, counter = 0, middle, leftEnd, rightEnd;
		boolean found = false;
		int[] helper = new int[A.length];
		for (int i = 0; i < A.length; i++) {
			leftEnd = 0;
			rightEnd = A.length;
			middle = A.length / 2;
			j = middle;
			found = false;
			while(!found || j == i+1 || j == A.length - 1) {
				if(B[i] > A[j] && A[j+1] < B[i]) {
					
				} else if(B[i] < A[j]) {
					
				} else 
					
			}
			while (j < A.length) {
				if (A[i] <= A[j] && B[i] >= A[j]) {
					found = true;
					System.out.println("A: " + A[i] + " B: " + B[i] + " C: " + A[j] + " D: " + B[j]);
					counter++;
					helper[j] = 1;
				} else if (A[j] <= A[i] && B[j] >= A[i]) {
					found = true;
					System.out.println("A: " + A[i] + " B: " + B[i] + " C: " + A[j] + " D: " + B[j]);
					helper[j] = 1;
					counter++;
				}
				j++;
			}
			if (!found && helper[i] != 1) {
				System.out.println("A: " + A[i] + " B: " + B[i]);
				counter++;
			}
		}
		return counter;
	}
	
	

	public static void mergeSort(int[] a, int[] b) {
		int[] tmp = new int[a.length];
		int[] tmp2 = new int[a.length];
		mergeSorter(a, b, tmp, tmp2, 0, a.length - 1);
	}

	private static void mergeSorter(int[] a, int[] b, int[] tmp, int[] tmp2, int left, int right) {
		if (left < right) {
			int center = (left + right) / 2;
			mergeSorter(a, b, tmp, tmp2, left, center);
			mergeSorter(a, b, tmp, tmp2, center + 1, right);
			merge(a, b, tmp, tmp2, left, center + 1, right);
		}
	}

	private static void merge(int[] a, int[] b, int[] tmp, int[] tmp2, int left, int right, int rightEnd) {
		int leftEnd = right - 1;
		int k = left;
		int num = rightEnd - left + 1;

		while (left <= leftEnd && right <= rightEnd)
			if (a[left] - a[right] <= 0) {
				tmp2[k] = b[left];
				tmp[k++] = a[left++];

			} else {
				tmp2[k] = b[right];
				tmp[k++] = a[right++];
			}
		while (left <= leftEnd) {
			tmp2[k] = b[left];
			tmp[k++] = a[left++];
		}

		while (right <= rightEnd) {
			tmp2[k] = b[right];
			tmp[k++] = a[right++];
		}

		for (int i = 0; i < num; i++, rightEnd--) {
			a[rightEnd] = tmp[rightEnd];
			b[rightEnd] = tmp2[rightEnd];
		}
	}
}
