package main

import (
	"log"
	"net/http"
	"strconv"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

var startTime time.Time

func uptime() time.Duration {
	return time.Since(startTime)
}

func setupRouter() *gin.Engine {
	r := gin.Default()

	r.Use(cors.Default())
	r.GET("/monitor", monitor)
	r.GET("/", total)
	return r
}

func main() {
	r := setupRouter()
	r.Run()
}

func monitor(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"serverHealth": "OK",
		"date":         time.Now(),
		"serverUpTime": uptime().String(),
	})
}

func total(c *gin.Context) {

	mod1 := c.DefaultQuery("module_1", "")
	mod2 := c.DefaultQuery("module_2", "")
	mod3 := c.DefaultQuery("module_3", "")
	mod4 := c.DefaultQuery("module_4", "")
	mod5 := c.DefaultQuery("module_5", "")

	mark1 := c.DefaultQuery("mark_1", "")
	mark2 := c.DefaultQuery("mark_2", "")
	mark3 := c.DefaultQuery("mark_3", "")
	mark4 := c.DefaultQuery("mark_4", "")
	mark5 := c.DefaultQuery("mark_5", "")

	marks := [5]string{mark1, mark2, mark3, mark4, mark5}
	modules := [5]string{mod1, mod2, mod3, mod4, mod5}

	statusCode := http.StatusOK
	error := false
	funct := "total"
	errorMessage := ""
	mark := marks
	total := 0

	for i := 0; i < len(marks); i++ {
		if marks[i] == "" {
			errorMessage = "Mark is missing, please provide valid marks"
		}
	}

	if errorMessage == "" {
		m1, err := strconv.Atoi(mark1)
		m2, err := strconv.Atoi(mark2)
		m3, err := strconv.Atoi(mark3)
		m4, err := strconv.Atoi(mark4)
		m5, err := strconv.Atoi(mark5)

		if err != nil {
			log.Println("action failed: ", err)
			return
		}

		total = m1 + m2 + m3 + m4 + m5

	} else {
		error = true
		statusCode = http.StatusBadRequest
	}

	c.JSON(statusCode, gin.H{
		"error":        error,
		"errorMessage": errorMessage,
		"func":         funct,
		"modules":      modules,
		"marks":        mark,
		"total":        total,
	})
}
