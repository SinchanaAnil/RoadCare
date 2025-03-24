
export interface WardComplaint {
  id: number;
  wardNumber: number;
  wardName: string;
  constituency: string;
  complaints: number;
  constituencyLevel?: string;
  complaintCount?: number;
  lat?: number;
  lng?: number;
}

// These are approximate coordinates for some major wards in Bengaluru
// In a real application, you would have precise coordinates for each ward
const wardCoordinates: Record<string, [number, number]> = {
  "Jnana Bharathi Ward": [12.9346, 77.5027],
  "Shettihalli": [13.0598, 77.5080],
  "Rajarajeshwari Nagar": [12.9259, 77.5193],
  "Banasavadi": [13.0143, 77.6456],
  "Peenya Industrial Area": [13.0314, 77.5190],
  "HBR Layout": [13.0398, 77.6112],
  "Jakkuru": [13.0654, 77.5929],
  "Rajagopal Nagara": [12.9915, 77.5140],
  "HSR Layout": [12.9116, 77.6473],
  "Bellanduru": [12.9257, 77.6787],
  "Kadugodi": [12.9900, 77.7629],
  "Puttenahalli": [12.8910, 77.5838],
  "Thanisandra": [13.0729, 77.6280],
  "CV Raman Nagar": [12.9852, 77.6600],
  "Girinagara": [12.9463, 77.5378],
  "Gottigere": [12.8636, 77.5976],
  "Vidyaranyapura": [13.0862, 77.5593],
  "Koramangala": [12.9352, 77.6245],
  "Jayanagar": [12.9301, 77.5828],
  "Malleswaram": [13.0085, 77.5646],
  "Yelahanka": [13.1005, 77.5966],
  "Hebbal": [13.0399, 77.5900],
};

// Adding top 30 wards with highest complaints, others can be added as needed
export const bangaloreComplaints: WardComplaint[] = [
  { id: 1, wardNumber: 129, wardName: "Jnana Bharathi Ward", constituency: "RAJARAJESHWARI NAGAR", complaints: 854, lat: 12.9346, lng: 77.5027 },
  { id: 2, wardNumber: 12, wardName: "Shettihalli", constituency: "DASARAHALLI", complaints: 401, lat: 13.0598, lng: 77.5080 },
  { id: 3, wardNumber: 160, wardName: "Rajarajeshwari Nagar", constituency: "RAJARAJESHWARI NAGAR", complaints: 383, lat: 12.9259, lng: 77.5193 },
  { id: 4, wardNumber: 27, wardName: "Banasavadi", constituency: "SARVARGNA NAGAR", complaints: 352, lat: 13.0143, lng: 77.6456 },
  { id: 5, wardNumber: 41, wardName: "Peenya Industrial Area", constituency: "DASARAHALLI", complaints: 344, lat: 13.0314, lng: 77.5190 },
  { id: 6, wardNumber: 24, wardName: "HBR Layout", constituency: "SARVARGNA NAGAR", complaints: 332, lat: 13.0398, lng: 77.6112 },
  { id: 7, wardNumber: 5, wardName: "Jakkuru", constituency: "BYATARAYANAPURA", complaints: 325, lat: 13.0654, lng: 77.5929 },
  { id: 8, wardNumber: 70, wardName: "Rajagopal Nagara", constituency: "DASARAHALLI", complaints: 302, lat: 12.9915, lng: 77.5140 },
  { id: 9, wardNumber: 174, wardName: "HSR Layout", constituency: "BOMMANAHALLI", complaints: 263, lat: 12.9116, lng: 77.6473 },
  { id: 10, wardNumber: 150, wardName: "Bellanduru", constituency: "MAHADEVAPURA (SC)", complaints: 239, lat: 12.9257, lng: 77.6787 },
  { id: 11, wardNumber: 83, wardName: "Kadugodi", constituency: "MAHADEVAPURA (SC)", complaints: 223, lat: 12.9900, lng: 77.7629 },
  { id: 12, wardNumber: 187, wardName: "Puttenahalli", constituency: "BOMMANAHALLI", complaints: 205, lat: 12.8910, lng: 77.5838 },
  { id: 13, wardNumber: 6, wardName: "Thanisandra", constituency: "BYATARAYANAPURA", complaints: 201, lat: 13.0729, lng: 77.6280 },
  { id: 14, wardNumber: 57, wardName: "CV Raman Nagar", constituency: "C.V. RAMAN NAGAR (SC)", complaints: 201, lat: 12.9852, lng: 77.6600 },
  { id: 15, wardNumber: 162, wardName: "Girinagara", constituency: "BASAVANAGUDI", complaints: 190, lat: 12.9463, lng: 77.5378 },
  { id: 16, wardNumber: 194, wardName: "Gottigere", constituency: "BANGALORE SOUTH", complaints: 187, lat: 12.8636, lng: 77.5976 },
  { id: 17, wardNumber: 9, wardName: "Vidyaranyapura", constituency: "BYATARAYANAPURA", complaints: 181, lat: 13.0862, lng: 77.5593 },
  { id: 18, wardNumber: 10, wardName: "Dodda Bommasandra", constituency: "BYATARAYANAPURA", complaints: 180, lat: 13.0712, lng: 77.5693 },
  { id: 19, wardNumber: 14, wardName: "Bagalakunte", constituency: "DASARAHALLI", complaints: 180, lat: 13.0530, lng: 77.5315 },
  { id: 20, wardNumber: 149, wardName: "Varthuru", constituency: "MAHADEVAPURA (SC)", complaints: 175, lat: 12.9428, lng: 77.7418 },
  { id: 21, wardNumber: 39, wardName: "Chokkasandra", constituency: "DASARAHALLI", complaints: 173, lat: 13.0218, lng: 77.5132 },
  { id: 22, wardNumber: 8, wardName: "Kodigehalli", constituency: "BYATARAYANAPURA", complaints: 171, lat: 13.0792, lng: 77.5815 },
  { id: 23, wardNumber: 198, wardName: "Hemmigepura", constituency: "YESHVANTHAPURA", complaints: 169, lat: 12.8869, lng: 77.4790 },
  { id: 24, wardNumber: 73, wardName: "Kottegepalya", constituency: "RAJARAJESHWARI NAGAR", complaints: 165, lat: 12.9957, lng: 77.5043 },
  { id: 25, wardNumber: 13, wardName: "Mallasandra", constituency: "DASARAHALLI", complaints: 162, lat: 13.0452, lng: 77.5101 },
  { id: 26, wardNumber: 82, wardName: "Garudachar Palya", constituency: "MAHADEVAPURA (SC)", complaints: 158, lat: 12.9756, lng: 77.7128 },
  { id: 27, wardNumber: 185, wardName: "Yelchenahalli", constituency: "BANGALORE SOUTH", complaints: 158, lat: 12.8802, lng: 77.5736 },
  { id: 28, wardNumber: 54, wardName: "Hudi", constituency: "MAHADEVAPURA (SC)", complaints: 157, lat: 13.0276, lng: 77.7118 },
  { id: 29, wardNumber: 23, wardName: "Nagavara", constituency: "SARVARGNA NAGAR", complaints: 152, lat: 13.0438, lng: 77.6183 },
  { id: 30, wardNumber: 72, wardName: "Herohalli", constituency: "YESHVANTHAPURA", complaints: 152, lat: 12.9869, lng: 77.4995 }
];

// Generate a list of all constituencies with total complaints
export const constituencyComplaints = [
  { name: "RAJARAJESHWARI NAGAR", complaints: 1832 },
  { name: "DASARAHALLI", complaints: 1763 },
  { name: "BYATARAYANAPURA", complaints: 1287 },
  { name: "MAHADEVAPURA (SC)", complaints: 1246 },
  { name: "SARVARGNA NAGAR", complaints: 1052 },
  { name: "BOMMANAHALLI", complaints: 776 },
  { name: "BANGALORE SOUTH", complaints: 706 },
  { name: "K.R.PURA", complaints: 643 },
  { name: "C.V. RAMAN NAGAR (SC)", complaints: 613 },
  { name: "YESHVANTHAPURA", complaints: 605 },
  { name: "BASAVANAGUDI", complaints: 577 },
  { name: "HEBBAL", complaints: 564 },
  { name: "PADMANABA NAGAR", complaints: 542 },
  { name: "SHIVAJI NAGAR", complaints: 488 },
  { name: "PULAKESHI NAGAR (SC)", complaints: 408 },
  { name: "CHAMARAJPET", complaints: 396 },
  { name: "MALLESWARAM", complaints: 378 },
  { name: "SHANTI NAGAR", complaints: 366 },
  { name: "RAJAJI NAGAR", complaints: 353 },
  { name: "YELAHANKA", complaints: 302 },
  { name: "VIJAYA NAGAR", complaints: 297 },
  { name: "GANDHI NAGAR", complaints: 277 },
  { name: "B.T.M. LAYOUT", complaints: 272 },
  { name: "MAHALAXMI LAYOUT", complaints: 233 },
  { name: "CHICKPET", complaints: 174 },
  { name: "GOVINDRAJA NAGAR", complaints: 164 },
  { name: "JAYANAGAR", complaints: 123 },
  { name: "ANEKAL (SC)", complaints: 108 }
];
