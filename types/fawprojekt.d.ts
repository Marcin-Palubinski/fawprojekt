declare module 'fawprojekt' {
	interface UserQuick {
		id: number | null;
		name: string;
		email: string;
		image: string;
	}
	interface Comment {
		id: number;
		content: string;
		userId: number;
		postId: number;
		createdAt: string;
		user: UserQuick;
	}
	interface Post {
		id: number;
		title: string;
		content: string;
		userId: number;
		createdAt: string;
		reactions: Number[];
		user: UserQuick;
		comments: Array[Comment];
	}
}
