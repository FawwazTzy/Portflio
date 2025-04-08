// eslint-disable-next-line no-unused-vars
import { useRef, useEffect } from "react";
import DeviceBox from "./DeviceBox";
import { useZustandState } from "../../../store/state";
import { updateMap, convertToDataChart } from "../function";
import { fetchGetNodePicture, fetchChartNode } from "../../../Utils/api";


function NodeBox() {
  const {
    setViewport,
    setISensorImageVisible,
    setDataChartXY,
    setMaxY_Axis,
    setMinY_Axis,
    nodesView,
    setNodesView,
    setNodeSelected,
    dipilihULTG,
    setFilterName,
    unitSelected, setImageUrl, imageUrl, setIsChartReady
  } = useZustandState((state) => state);

  const onClickHandle = async ( device ) => {
    // menghilangkan cache pada URL
    URL.revokeObjectURL(imageUrl);
    setFilterName('Daily')
    setISensorImageVisible(false);
    //! update position map dan zoom
    setViewport(updateMap(device));
    //! Mengubah semua isClicked menjadi false
    const updatenodesViewIsClickedFalse = nodesView.map((item) => ({
      ...item,
      isClicked: false,
    }));

    //! update key isCLicked jika sebelumnya sudah di klik
    const updatedDataHaveClicked = updatenodesViewIsClickedFalse.map(item => {
      if (item.nodeName === device.nodeName) {
        return {
          ...item,
          isClicked: true
        };
      }
      return item;
    });
    //! update node yang diclick
    setNodeSelected(device)
    //! update data
    setNodesView(updatedDataHaveClicked)
    console.log("Node Name ", device.nodeName)
    console.log("updatedDataHaveClicked ", updatedDataHaveClicked)

    //! flag untuk menampilkan sensor image
    const objectUrl = await fetchGetNodePicture(device.nodeName);
    console.log("objectUrl ", objectUrl)
    setImageUrl(objectUrl);

    // delay 3 detik
    setTimeout(() => {
      setISensorImageVisible(true);
    }, 400); // 3000 ms = 3 detik

    //! get data chart
    const type = "daily"; //daily, weekly, monthly, other
    let start = "2025-04-03"; //2025-04-03
    let end = "2025-04-03"; //2025-04-03
    const res = await fetchChartNode(device.nodeName, type, start, end)
    const dataJson = res.data.message;
    console.log("Chart Res ", dataJson)
    if (dataJson.length > 0) {
      const pressure = dataJson[0].pressures
      const dateTime = dataJson[0].dateTime
      console.log("pressure ", pressure)
      console.log("dateTime ", dateTime)
      const d = await convertToDataChart(
        dateTime,
        pressure
      );
      console.log("DataChartXY ", d[0])
      setDataChartXY(d[0]);
      setMaxY_Axis(d[1]);
      setMinY_Axis(d[2]);
      setIsChartReady(true)
    } else {
      setIsChartReady(false)
    }
  };

  const dipilihULTGRef = useRef(dipilihULTG);
  const unitSelectedRef = useRef(unitSelected);

  // update ref setiap dipilihULTG berubah
  useEffect(() => {
    dipilihULTGRef.current = dipilihULTG;
    unitSelectedRef.current = unitSelected;
  }, [dipilihULTG, unitSelected]);

  return (
    <div className="flex w-full h-full flex-col p-[10my] ">
      <div className="w-full flex items-center justify-center h-[30px] ">
        <p className="text-[18px] text-textColor ">Node Island</p>
      </div>
      <div className="flex-1 overflow-y-auto w-full h-full mt-[10px] pl-[10px] pr-[10px]">
        {nodesView.map((device, index) => (
          <div
            className="cursor-pointer"
            key={index}
            onClick={() => onClickHandle(device )}
          >
            <DeviceBox
              title={device.nodeName}
              value={device.pressure}
              isClicked={device.isClicked}
              statusCam={device.statusCam}
              statusGauge={device.statusGauge}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
// overflow - y - scroll;
export default NodeBox;
