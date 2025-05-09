import { useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import { useAlboData } from 'context/AlboDataContext';
import { useDispatch } from 'react-redux';
import { setDataArrived } from 'store';
const SOCKET_URL = 'ws://localhost:8000/sim'; // Adjust as needed

function useCreateWebSocket({ taskId, direction }) {
	const dispatch = useDispatch();
	const { setDataSim, setIsLoadingSim } = useAlboData();
	const socketRef = useRef(null); // Store WebSocket connection
	useEffect(() => {
		// Avoid creating multiple sockets
		if (!socketRef.current) {
			const socket = io(SOCKET_URL, {
				path: '/devapi/sim-runner/socket.io/',
				transports: ['websocket', 'polling'],
				reconnectionAttempts: 5,
				reconnectionDelay: 2000,
			});
			socketRef.current = socket;

			socket.on('connect', () => {
				console.log('WebSocket Connected to /sim');
			});

			socket.on('disconnect', () => {
				console.log('WebSocket Disconnected');
			});
		}

		return () => {
			if (socketRef.current) {
				socketRef.current.disconnect();
				socketRef.current = null;
			}
		};
	}, []); // Run once on mount

	useEffect(() => {
		const socket = socketRef.current;
		if (!socket) return;

		const handleTaskUpdate = (message) => {
			console.log('Received WebSocket Update:', message);

			if (message.task_id === taskId) {
				if (message.status === 'SUBMITTED') {
					setIsLoadingSim(true);
				} else if (message.status === 'PENDING') {
					// TODO: need to convery to SimDataMessenger that the simulation is in progress and we need to make sure that dataSim stays null
					setIsLoadingSim(true);
					// setDataSim()
				} else if (message.status === 'SUCCESS') {
					setDataSim(message.result); // Store final data
					setIsLoadingSim(false);
					console.log({ m: message.result });
					dispatch(setDataArrived({ direction, value: true })); // Notify Redux of data arrival
				} else {
					console.log(`Simulation in Progress: ${message.status}`);
				}
			}
		};

		socket.on('task_update', handleTaskUpdate);

		return () => {
			socket.off('task_update', handleTaskUpdate);
		};
	}, [taskId]);

	return { socketRef };
}

export default useCreateWebSocket;
