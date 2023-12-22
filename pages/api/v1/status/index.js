function status(request, response) {
  response.status(200).json({ message: "Página de status ok" })
}

export default status