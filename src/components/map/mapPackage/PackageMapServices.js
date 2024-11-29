import markerLogo from "assets/images/VEClim-Map-Icon-30x30px.png";
import L from "leaflet";
import "leaflet-side-by-side";

import {
	setMapPagePosition,
	setPanelInterfere,
	setPanelOpenLeft,
	setSwitchMap,
	setMapLoaded,
	setLeftMapLoaded,
	setRightMapLoaded,
	setCurrentMapCenter,
	setCurrentMapZoom,
	setVectorName,
	setTileArray,
	setDisplayedPanelIDLeft,
	setCurrentMapBounds,
	setMapVector,
} from "store";
import TileLoaderService from "../../../customHooks/TileLoaderService";
import ErrorScreenMap from "components/map/errorScreen/ErrorScreenMap";
import { setCurrentMaxBounds } from "store";
import { setDisplayReady } from "store";
import { setPanelInterfereRight } from "store";

class PackageMapServices {
	static baseLayer = L.tileLayer(
		"http://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.webp",
		{ attribution: "", noWrap: true }
	);
	static cyprusBounds = [
		[34.25, 31.5],
		[36, 35],
	];

	static worldBounds = [
		[-90, -180],
		[90, 180],
	];
	static defaultWorldCenter = [0, 0];
	static defaultCypCenter = [35.1, 33.33];
	static icon1 = L.icon({
		iconUrl: markerLogo,
		iconSize: [30, 30],
		iconAnchor: [15, 30], // The point of the icon that corresponds to the marker's location
		popupAnchor: [0, -30],
	});

	static resizeMap(mapParRef, vectorName, dispatch) {
		let p = mapParRef.current;
		this.setMinZoom(mapParRef, vectorName);

		p.map.setMaxBounds(p.maxBounds);

		let newZoom = this.calculateZoomForBounds(mapParRef);
		p.zoom = p.map.getZoom();
		let tempMin = newZoom < 2 ? p.zoom : newZoom;

		p.map.setMinZoom(tempMin);
		p.minZoom = tempMin;
		dispatch(setCurrentMapZoom(p.zoom));

		// p.map.setView([p.center[0], p.center[1]], p.zoom);
	}

	static handleToMapPageTransition(dispatch, vectorName, mapVector) {
		if (mapVector === "albopictus") {
			dispatch(setCurrentMapBounds(PackageMapServices.worldBounds));
			// dispatch(setDirectMap({ lon: null, lat: null, display: -2 }));
		} else if (mapVector === "papatasi") {
			dispatch(setCurrentMapBounds(PackageMapServices.cyprusBounds));
			// dispatch(setDirectMap({ lon: null, lat: null, display: -2 }));
		} else {
			dispatch(setVectorName(mapVector));
			//  dispatch(setMapVector(vectorName));
		}
		// dispatch(setPageTransition(true));
	}
	static handleMapSwitch(dispatch, vectorName, desiredVector) {
		if (desiredVector === vectorName) {
			console.log("we have the same vector");
			return;
		}

		dispatch(setSwitchMap(true));
		if (desiredVector === "papatasi") {
			console.log("setting things up for papatasi");
			dispatch(setVectorName("papatasi"));
			dispatch(setMapVector("papatasi"));
			dispatch(setTileArray(["papatasi_aprdec"]));
			dispatch(setCurrentMapCenter(this.defaultCypCenter));
			dispatch(setCurrentMapBounds(this.cyprusBounds));
			dispatch(setCurrentMaxBounds(this.cyprusBounds));
			dispatch(setCurrentMapZoom(8));
			dispatch(setDisplayReady(false));
		} else {
			dispatch(setVectorName("albopictus"));
			dispatch(setMapVector("albopictus"));
			dispatch(setTileArray(["colegg"]));
			dispatch(setCurrentMapCenter(this.defaultCypCenter));
			dispatch(setDisplayReady(false));
		}

		dispatch(setDisplayedPanelIDLeft(0));
		dispatch(setPanelOpenLeft(false));
	}

	static handleMapClick(
		e,
		mapParRef,
		vectorName,
		dispatch,
		directMap,
		directMapRight,
		
	) {
		this.clickMap(e, mapParRef, vectorName, dispatch);
		// TODO: MAY NEED TO REMOVE

		if (directMap) {
			if (directMap.display === -2) dispatch(setPanelInterfere(-1));
		} else {
			dispatch(setPanelInterfere(-1));
		}
		if (directMapRight) {
			if (directMapRight.display === -2) dispatch(setPanelInterfereRight(null));
		} else {
			dispatch(setPanelInterfereRight(null));
		}
	}
	static clickMap = (e, mapParRef, vectorName, dispatch,) => {
		let p = mapParRef.current;
		const switchZoom = 4;
		let newPosition = this.roundPosition(
			vectorName,
			e.latlng.lat,
			e.latlng.lng
		);
		newPosition = { ...newPosition, res: [0.125, 0.125] };
		p.prevClickPointRef = newPosition;
			dispatch(
				setMapPagePosition({ lat: newPosition.lat, lng: newPosition.lng })
			);
		p.highlightMarker && p.map.removeLayer(p.highlightMarker);
		p.iconMarker && p.map.removeLayer(p.iconMarker);
		p.rectMarker && p.map.removeLayer(p.rectMarker);
		p.rectMarker = this.highlightMarkerFunc(
			newPosition.lat,
			newPosition.lng,
			mapParRef,
			"",
			"green",
			vectorName
		);

		const { res, ...newPosition1 } = newPosition;
		p.iconMarker = L.marker(newPosition1, { icon: this.icon1 }).addTo(p.map);

		if (p.map.getZoom() > switchZoom) {
			p.iconMarker && p.map.removeLayer(p.iconMarker);
		} else {
			p.rectMarker && p.map.removeLayer(p.rectMarker);
		}
	};

	static highlightMarkerFunc = (
		lat,
		lng,
		mapParRef,
		className,
		color,
		vectorName
	) => {
		let p = mapParRef && mapParRef.current;
		let newMarker;
		if (p.map) {
			const newPosition = this.roundPosition(vectorName, lat, lng);
			newMarker = L.rectangle(
				[
					[
						newPosition.lat + newPosition.res[1],
						newPosition.lng - newPosition.res[0],
					],
					[
						newPosition.lat - newPosition.res[1],
						newPosition.lng + newPosition.res[0],
					],
				],
				{ className: className, color: color }
			).addTo(p.map);
			// p.highlightMarker = newMarker;
		}
		return newMarker;
	};
	static roundPosition(vectorName, lat, lng) {
		function roundPositionMosq(lat, lng) {
			let roundedLat = 0.0 + Math.round(lat / 0.25) * 0.25;
			let roundedLng = 0.0 + Math.round(lng / 0.25) * 0.25;
			return {
				lat: roundedLat,
				lng: roundedLng,
				res: [0.125, 0.125],
			};
		}
		function roundPositionSand(lat, lng) {
			let roundedLat = 0.009 + Math.round((lat - 0.009) / 0.0215) * 0.0215;
			let roundedLng = 0.0033 + Math.round((lng - 0.0033) / 0.0215) * 0.0215;
			return {
				lat: roundedLat,
				lng: roundedLng,
				res: [0.0215 / 2.0, 0.0215 / 2.0],
			};
		}

		if (vectorName === "albopictus") {
			return roundPositionMosq(lat, lng);
		} else {
			return roundPositionSand(lat, lng);
		}
	}
	static updateCoordinates({ e, mapParRef, vectorName, dispatch }) {
		let p = mapParRef.current;
		if (!e.latlng) return;
		p.zoom = p.map.getZoom();
		let tempCenter = p.map.getCenter();
		p.center = [tempCenter.lat, tempCenter.lng];

		const { lat, lng } = e.latlng;
		p.highlightMarker && p.map.removeLayer(p.highlightMarker);
		let newPosition = this.roundPosition(vectorName, lat, lng);
		p.highlightMarker = this.highlightMarkerFunc(
			newPosition.lat,
			newPosition.lng,
			mapParRef,
			"marker-green",
			"blue",
			vectorName
		);
		let elm = document.getElementById("coordinates");
		elm.innerHTML = `lat<br/>${newPosition.lat.toFixed(
			2
		)}<br/>${newPosition.lng.toFixed(2)}<br/>lon`;
		elm.style.display = "flex";
	}
	static calculateBounds(value) {
		return L.latLngBounds(
			L.latLng(value[0][0], value[0][1]),
			L.latLng(value[1][0], value[1][1])
		);
	}

	static mapBounds(
		mapParRef,
		vectorName,
		pageTransition,
		switchMap,
		currentMapCenter,
		currentMapZoom,
		dispatch
	) {
		let p = mapParRef.current;

		let bounds = p.map ? p.map.getBounds() : null;
		const boundsArray = [
			[bounds._southWest.lat, bounds._southWest.lng], // South West corner
			[bounds._northEast.lat, bounds._northEast.lng], // North East corner
		];
		if (vectorName === "albopictus" && !switchMap) {
			p.maxBounds = this.calculateBounds(this.worldBounds);
			p.center = p.center ? p.center : this.defaultWorldCenter;
			p.zoom = p.zoom ? p.zoom : 1;
		} else if (vectorName === "albopictus" && switchMap) {
			p.maxBounds = this.calculateBounds(this.worldBounds);
			p.center = p.center ? p.center : this.defaultCypCenter;

			p.zoom = p.zoom ? p.zoom : 3;
		} else {
			p.maxBounds = this.calculateBounds(this.worldBounds);
			p.center = p.center ? p.center : this.defaultCypCenter;
			p.zoom = p.zoom ? p.zoom : 3;
		}
		if (pageTransition) {
			p.center = currentMapCenter;
			p.zoom = currentMapZoom;
		} else {
		}
		bounds && dispatch(setCurrentMapBounds(boundsArray));

		const boundsArray1 = [
			[p.maxBounds._southWest.lat, p.maxBounds._southWest.lng], // South West corner
			[p.maxBounds._northEast.lat, p.maxBounds._northEast.lng], // North East corner
		];

		dispatch(setCurrentMaxBounds(boundsArray1));
		dispatch(setCurrentMapZoom(p.zoom));
		dispatch(setCurrentMapCenter(p.center));
		dispatch(setSwitchMap(false));
		// this.markerHandler(mapParRef, 4, vectorName, dispatch);
	}
	static setMinZoom(mapParRef, vectorName) {
		let p = mapParRef.current;

		let newMinZoom = 2;
		if (vectorName === "albopictus") {
			newMinZoom = p.map.getBoundsZoom(this.worldBounds, true);
		} else {
			newMinZoom = p.map.getBoundsZoom(this.cyprusBounds, false);
		}
		if (p.map.getZoom() < newMinZoom) {
			p.map.setZoom(newMinZoom);
		}
		p.map.setMinZoom(newMinZoom);

		p.minZoom = newMinZoom;
		return newMinZoom;
	}
	static calculateZoomForBounds(mapParRef, bounds) {
		// Get the size of the map container

		if (bounds) {
			console.log("bounds", bounds);
			let p = mapParRef.current;
			var zoom = p.map.getZoom();
			var nw = p.map.project(bounds.getNorthWest(), zoom);
			var se = p.map.project(bounds.getSouthEast(), zoom);

			// Calculate the bounds size in pixels at the current zoom level
			var boundsSize = nw.distanceTo(se);

			// Calculate the scaling factor to fit the bounds into the current map size
			var scaleX = window.innerWidth / boundsSize;
			var scaleY = window.innerHeight / boundsSize;

			// Calculate the zoom adjustment based on the scaling factor
			var zoomAdjustment = Math.log(Math.min(scaleX, scaleY)) / Math.log(2);
			// Adjust the current zoom level
			var newZoom = zoom + zoomAdjustment;

			return newZoom;
		}
	}

	static mouseOut = (mapParRef) => {
		let p = mapParRef.current;
		p.highlightMarker && p.map.removeLayer(p.highlightMarker);
		let elm = document.getElementById("coordinates");
		elm.innerHTML = "";
		elm.style.display = "none";
	};
	static debounce(func, wait) {
		let timeout;

		return function executedFunction(...args) {
			const later = () => {
				clearTimeout(timeout);
				func(...args);
			};

			clearTimeout(timeout);
			timeout = setTimeout(later, wait);
		};
	}

	static handleDoubleMap(mapParRef, tileMat, tileArray, dispatch) {
		let p = mapParRef.current;
		let sideBySideMap = p.sideBySide;
		let tempCenter = p.map.getCenter();
		p.center = [tempCenter.lat, tempCenter.lng];

		p.zoom = p.map.getZoom();
		if (tileArray.length === 0) {
			dispatch(setMapLoaded(false));
			sideBySideMap && sideBySideMap.remove();
			tileMat = [];
		} else if (tileArray.length === 1) {
			dispatch(setMapLoaded(false));
			if (sideBySideMap) {
				sideBySideMap.remove();
			}
		} else {
			p.map.createPane("left");
			p.map.createPane("right");
			dispatch(setLeftMapLoaded(false));
			dispatch(setRightMapLoaded(false));
			sideBySideMap && sideBySideMap.remove();
			p.sideBySide = L.control
				.sideBySide([tileMat[0]], [tileMat[1]], {})

				.addTo(p.map);
		}
	}

	static addTiles(mapParRef, tileArray, tilesFromContext, dispatch) {
		let tileMat = [];
		let p = mapParRef.current;
		if (tileArray.length === 0) return [];
		tileArray.forEach((tile, index) => {
			let selectedTile = tilesFromContext.find(
				(tileIcon) => tileIcon.key === tile
			);
			try {
				selectedTile &&
					tileMat.push(
						L.tileLayer(
							selectedTile.tileLayer.tile,
							selectedTile.tileLayer.props
						)
					);
			} catch (e) {
				<ErrorScreenMap error={e}></ErrorScreenMap>;
			}
		});

		TileLoaderService.handleTileStyles(tileMat, dispatch, tileArray);
		tileMat.forEach((tile, index) => {
			tile.addTo(p.map);
		});
		return tileMat;
	}

	// static chooseTileIcons(tileArray, tilesFromContext) {
	// 	if (tileArray.length === 0) return [];
	// 	const tiles = tileArray.flatMap((tile, index) => {
	// 		let selectedTile = tilesFromContext.find(
	// 			(tileIcon) => tileIcon.key === tile
	// 		);
	// 		return selectedTile.tileLayer;
	// 	});
	// 	return tiles;
	// }
	static _removeMarker({ mapParRef, marker1 }) {
		let p = mapParRef && mapParRef.current;
		marker1 && p.map.removeLayer(marker1);
		marker1 = {};
	}
	// marker1 = null;

	static markerHandler = (mapParRef, switchZoom, vectorName, dispatch) => {
		let p = mapParRef.current;
		if (p) {
			p.zoom = p.map.getZoom();
			p.center = [p.map.getCenter().lat, p.map.getCenter().lng];
			if (p.prevClickPointRef) {
				p.iconMarker && p.map.removeLayer(p.iconMarker);
				p.rectMarker && p.map.removeLayer(p.rectMarker);
				p.highlightMarker && p.map.removeLayer(p.highlightMarker);
				let newPosition = p.prevClickPointRef;
				if (p.map.getZoom() > switchZoom) {
					p.iconMarker && p.map.removeLayer(p.iconMarker);
					p.rectMarker = this.highlightMarkerFunc(
						newPosition.lat,
						newPosition.lng,
						mapParRef,
						"",
						"green",
						vectorName
					);
				} else {
					p.rectMarker && p.map.removeLayer(p.rectMarker);
					p.iconMarker = L.marker(newPosition, { icon: this.icon1 }).addTo(
						p.map
					);
				}
			} else {
				return;
			}
			dispatch(setCurrentMapCenter(p.center));
			dispatch(setCurrentMapZoom(p.zoom));
		}
	};
}
export default PackageMapServices;
