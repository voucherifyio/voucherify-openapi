---
title: Location Object
type: basic
categorySlug: voucherify-api
parentDocSlug: locations
slug: location-object
hidden: false
order: 1
---

## Location object
| Attributes |  Description |
|:-----|:--------|
| id</br>`string` | <p>Unique location ID, assigned by the Voucherify API.</p> **Example:** <p>loc_NoMGXmHO9OUs7iz9mGWpamma</p> |
| object</br>`string` | <p>The type of the object represented by JSON. This object stores information about a <code>location</code>.</p> Available values: `location` |
| name</br>`string` | <p>Location name.</p> |
| shape</br>`object` | <p>Defines the shape and boundaries of the location.</p> One of: [Circle](#circle), [Polygon](#polygon) |
| created_at</br>`string` | <p>Timestamp representing the date and time when the location was created. The value is shown in the ISO 8601 format.</p> **Example:** <p>2022-02-14T15:12:06.817Z</p> |
| updated_at</br>`string`, `null` | <p>Timestamp representing the date and time when the location was updated. The value is shown in the ISO 8601 format.</p> **Example:** <p>2022-03-14T15:12:06.817Z</p> |

## Circle
| Attributes |  Description |
|:-----|:--------|
| type</br>`string` | <p>The type of shape being defined is a <code>circle</code>.</p> Available values: `circle` |
| format</br>`string` | <p>The location is defined in terms of a <code>distance</code> object.</p> Available values: `distance` |
| distance</br>`object` | <p>Defines the parameters for the circle.</p> <h3>Distance</h3><table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">center</br><code>string</code></td><td style="text-align:left"><p>Center of the circle identified by GPS coordinates in decimal degrees.</p> <strong>Example:</strong> <p>geo:40.79372699823857,-74.15092132694554</p></td></tr><tr><td style="text-align:left">radius</br><code>string</code></td><td style="text-align:left"><p>Defines the radius of the circle.</p></td></tr></tbody></table> |

## Polygon
| Attributes |  Description |
|:-----|:--------|
| type</br>`string` | <p>The type of shape being defined is a <code>polygon</code>.</p> Available values: `polygon` |
| format</br>`string` | <p>The location is defined in terms of a <code>geojson</code> object.</p> Available values: `geojson` |
| geojson | One of: [Geojson Polygon](#geojson-polygon), [Geojson Multi Polygon](#geojson-multi-polygon) |

## Geojson Polygon
| Attributes |  Description |
|:-----|:--------|
| type</br>`string` | <p>Type of geojson coordinates, i.e. <code>Polygon</code>.</p> Available values: `Polygon` |
| coordinates | See: [PolygonCoordinates](#polygoncoordinates) |

## Geojson Multi Polygon
| Attributes |  Description |
|:-----|:--------|
| type</br>`string` | <p>Type of geojson coordinates, i.e. <code>MultiPolygon</code>.</p> Available values: `MultiPolygon` |
| coordinates</br>`array` | Array of [PolygonCoordinates](#polygoncoordinates) |

## PolygonCoordinates


[block:html]
{
  "html": "<style>\n[title=\"Toggle library\"] { \n  display: none; }\n.LanguagePicker-divider { \n  display: none; }\n.Playground-section3VTXuaYZivJK > .APISectionHeader3LN_-QIR0m7x {\n  display: none; }\n.LanguagePicker-languages1qVVo_v6AlP9 {\n  display: none; }\n.headline-container-article-info2GaOf2jMpV0r {\n  display: none; }\n.APISectionHeader3LN_-QIR0m7x {\n  display: none; }\n.APIResponseSchemaPicker-label3XMQ9E-slNcS {\n  display: none; }\n.PlaygroundC7DInM9NFvBg {\n  display: none; }\n.Modal-Header3VPrQs3MUWWd {\n  display: none; }\n.rm-ReferenceMain .rm-Article {\n  max-width: 2000px; }\n</style>"
}
[/block]
