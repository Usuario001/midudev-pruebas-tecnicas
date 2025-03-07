//Ejercicio 1: 

/**
 * 1)Revisar parametros: Faltaba un parametro que es la función callback
 * 2)Revisión cuando hay error: Se debe llamar al callback con el error
 * 3)Faltan parametros para la función del error en el callback
 * 4)Cuando no hay error llamar al callback con el resultado y error en null
 * 5)Estandarizar parametros de error y resultado
 */
import net from 'node:net'

export const ping = (ip, callback) => {
  const startTime = process.hrtime()

  const client = net.connect({ port: 80, host: ip }, () => {
    client.end()
    callback(null, { time: process.hrtime(startTime), ip })
  })
  
  client.on('error', (err) => {
    client.end()
    callback({error: `Error al conectarse a: ${ip}`},{ time: process.hrtime(startTime), ip } )
  })
}

ping('midu.dev', (err, info) => {
  if (err) console.error(err)
  console.log(info)
})