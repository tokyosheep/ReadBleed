# ReadBleed
The Extension read bleed data on Illustrator document

It reads bleed values from Ai data
the specific process is

first save active Ai data with uncompressed option

second jsx return the fullPath and Extension read the Ai data through fs.readFileSync

third regExp pics bleed values out

finally you`ll get bleed value

problem is It takes long time to pic bleed out

and you need save Aidata each time
