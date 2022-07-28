import React, { Fragment, useEffect } from "react";
import {
	AiFillDelete,
	AiFillCloseCircle,
	AiFillCheckCircle,
} from "react-icons/ai";
import { MdUpdate } from "react-icons/md";
import "./PrimaryTable.css";

export default function PrimaryTable({
	tableHeader,
	tableBody,
	deleteCol,
	deleteRow,
	isAction,
	updateRow,
}) {
	return (
		<>
			{tableBody && tableBody[0] ? (
				<table className="primary-table" cellPadding={0} cellSpacing={0}>
					<thead>
						<tr>
							{tableHeader.map((item, index) => (
								<th key={index}>{item}</th>
							))}
						</tr>
					</thead>
					<tbody>
						{tableBody.map((item, index) => (
							<tr key={index}>
								{Object.keys(item).map((key, keyIndex) => (
									<td>{key === "id" ? index + 1 : item[key]}</td>
								))}
								{deleteCol && (
									<td
										className="delete-icon"
										onClick={() => deleteRow(item.id, index)}
									>
										<AiFillDelete />
									</td>
								)}
								{updateRow && (
									<td
										className="delete-icon"
										onClick={() => updateRow(item.id, index)}
									>
										<MdUpdate />
									</td>
								)}
								{isAction && (
									<td className="action-wrapper">
										<AiFillCloseCircle className="action-icons" />
										<AiFillCheckCircle className="action-icons" />
									</td>
								)}
							</tr>
						))}
					</tbody>
				</table>
			) : (
				"No data found"
			)}
		</>
	);
}
